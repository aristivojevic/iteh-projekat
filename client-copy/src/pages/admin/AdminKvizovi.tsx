import React, { useEffect, useState } from 'react';
import { Button, FlexboxGrid, Form, IconButton, Input, Message, Schema, Table, toaster, Pagination, SelectPicker } from 'rsuite';
import { kreirajKurs, obrisiKurs, vratiSveKurseve } from '../../servis/kursServis';
import { Kurs, Kviz, KvizSearch } from '../../tipovi';
import TrashIcon from '@rsuite/icons/Trash';
import { kreirajKviz, obrisiKviz, vratiKvizove } from '../../servis/kvizServis';
import { useLocation, useNavigate } from 'react-router';
import * as qs from 'query-string'
import styles from '../../App.module.css';
import classNames from 'classnames';
//@ts-ignore
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
const model = Schema.Model({
  naziv: Schema.Types.StringType().isRequired(),
  kursId: Schema.Types.NumberType().isInteger().isRequired()
})

export default function AdminKvizovi() {
  const [kvizovi, setKvizovi] = useState<Kviz[]>([]);
  const [kursevi, setKursevi] = useState<Kurs[]>([])
  const [totalElements, setTotalElements] = useState(0)
  const [formaKviz, setFormaKviz] = useState<any>({});
  const location = useLocation();
  const urlParsed = qs.parse(location.search) as Partial<KvizSearch>;
  useEffect(() => {
    vratiKvizove(qs.parse(location.search)).then(val => {
      setKvizovi(val.content);
      setTotalElements(val.totalElements);
    });
  }, [location.search])
  useEffect(() => {
    vratiSveKurseve().then(setKursevi)
  }, [])
  const navigate = useNavigate();
  const updateSearch = (vrednost: any) => {
    navigate('/kvizovi?' + qs.stringify({
      ...urlParsed,
      ...vrednost
    }))
  }
  return (
    <div className={classNames(styles.ekran, styles.maliPadding, styles.white)}>
      <h1 style={{ textAlign: 'center', width: '100%' }} >Spisak kvizova - ADMIN</h1>

      <FlexboxGrid className={styles.maliPadding} justify='space-between'>
        <FlexboxGrid.Item colspan={15}>
          <Input value={urlParsed?.naziv || ''} onChange={(value) => {
            updateSearch({
              naziv: value
            });
          }} placeholder='Pretrazi' className={styles.marginBotton} />
          <Table
            autoHeight
            wordWrap
            onSortColumn={(nazivKolone, sortType) => {
              updateSearch({
                sortColumn: nazivKolone,
                sortType: sortType?.toLocaleUpperCase() || 'ASC'
              })
            }}
            sortColumn={urlParsed.sortColumn}
            sortType={urlParsed.sortType === 'DESC' ? 'desc' : 'asc'}
            rowHeight={60}
            data={kvizovi}
          >
            <Table.Column sortable resizable >
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.Cell dataKey='id' />
            </Table.Column>
            <Table.Column sortable resizable width={300}>
              <Table.HeaderCell>Naziv kviza</Table.HeaderCell>
              <Table.Cell dataKey='naziv' />
            </Table.Column>
            <Table.Column resizable width={300}>
              <Table.HeaderCell>Kurs</Table.HeaderCell>
              <Table.Cell>
                {
                  kviz => kviz.kurs.naziv
                }
              </Table.Cell>
            </Table.Column>
            <Table.Column resizable width={150}>
              <Table.HeaderCell>Broj pitanja</Table.HeaderCell>
              <Table.Cell>
                {
                  (kviz: Kviz) => kviz.pitanja.length
                }
              </Table.Cell>
            </Table.Column>
            <Table.Column fixed='right' resizable width={80}>
              <Table.HeaderCell>Obrisi</Table.HeaderCell>
              <Table.Cell>
                {
                  kviz => {
                    return (
                      <IconButton onClick={async () => {
                        try {
                          await obrisiKviz(kviz.id)
                          vratiKvizove(qs.parse(location.search)).then(val => {
                            setKvizovi(val.content);
                            setTotalElements(val.totalElements);
                          });
                        } catch (error) {
                          toaster.push(<Message showIcon type='error' >Ne moze se obrisati izabrani kviz</Message>, { placement: 'topCenter' })
                        }
                      }} icon={<TrashIcon />} />
                    )
                  }
                }
              </Table.Cell>
            </Table.Column>
          </Table>

          <Pagination
            prev
            next
            first
            last
            size="xs"
            total={totalElements}
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            maxButtons={5}
            ellipsis
            onChangePage={(page) => {
              updateSearch({
                page: page - 1
              })
            }}
            onChangeLimit={limit => {
              updateSearch({
                size: limit
              })
            }}
            limitOptions={[5, 10, 20, 50]}
            limit={Number(urlParsed.size) || 20}
            activePage={(Number(urlParsed.page) || 0) + 1}
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>
          <h2>Kreiraj kviz</h2>
          <Form
            model={model}
            formValue={formaKviz}
            onChange={val => {
              //@ts-ignore
              setFormaKviz(val);
            }}
            checkTrigger='blur'
            onSubmit={async ch => {
              if (!ch) {
                return;
              }
              await kreirajKviz(formaKviz.naziv, formaKviz.kursId);
              vratiKvizove(qs.parse(location.search)).then(val => {
                setKvizovi(val.content);
                setTotalElements(val.totalElements);
              });
            }}
          >
            <Form.Group>
              <Form.ControlLabel>Naziv</Form.ControlLabel>
              <Form.Control name="naziv" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Kurs</Form.ControlLabel>
              <Form.Control name="kursId" accepter={SelectPicker} data={kursevi.map(element => {
                return {
                  value: element.id,
                  label: element.naziv
                }
              })} />
            </Form.Group>
            <Button type='submit' appearance='primary'>Kreiraj kviz</Button>
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
}
