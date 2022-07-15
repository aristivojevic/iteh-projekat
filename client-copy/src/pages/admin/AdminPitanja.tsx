import TrashIcon from '@rsuite/icons/Trash';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FlexboxGrid, Form, IconButton, Input, Message, Schema, SelectPicker, Table, toaster } from 'rsuite';
import { obrisiKurs } from '../../servis/kursServis';
import { vratiKvizove } from '../../servis/kvizServis';
import { izmeniPitanje, kreirajPitanje, obrisiPitanje, vratiSvaPitanja } from '../../servis/pitanjeServis';
import { AdminPitanje, Kviz, Opcija } from '../../tipovi';
import PlusIcon from '@rsuite/icons/Plus';
import styles from '../../App.module.css';
import classNames from 'classnames';
//@ts-ignore
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const model = Schema.Model({
  tekstPitanja: Schema.Types.StringType().isRequired(),
  brojPoena: Schema.Types.NumberType().isRequired().min(0),
  kvizId: Schema.Types.NumberType().isRequired().min(0),
  opcije: Schema.Types.ArrayType().minLength(2)
})

export default function AdminPitanja() {
  const [pitanja, setPitanja] = useState<AdminPitanje[]>([])
  const [formaPitanje, setFormaPitanje] = useState<any>({});
  const [kvizSearch, setKvizSearch] = useState('')
  const [kvizovi, setKvizovi] = useState<Kviz[]>([])
  const [selPitanjeId, setSelPitanjeId] = useState(0)
  useEffect(() => {
    vratiSvaPitanja().then(setPitanja);
  }, [])

  useEffect(() => {
    vratiKvizove({
      naziv: kvizSearch,
      page: 0,
      size: 5,
    }).then(val => {
      setKvizovi(val.content);
    })
  }, [kvizSearch])

  useEffect(() => {
    const pitanje = pitanja.find(e => e.id === selPitanjeId);
    if (!pitanje) {
      setFormaPitanje({});
    } else {
      setFormaPitanje({
        ...pitanje,
        kvizId: pitanje.kviz.id
      })
    }
  }, [selPitanjeId])

  return (
    <div className={classNames(styles.ekran, styles.maliPadding, styles.white)}>
      <h1 style={{ textAlign: 'center', width: '100%' }} >Spisak pitanja - ADMIN</h1>

      <FlexboxGrid className={styles.maliPadding} justify='space-between'>
        <FlexboxGrid.Item colspan={14}>
          <Table
            autoHeight
            wordWrap
            rowClassName={rowData => {
              if (rowData?.id === selPitanjeId) {
                return styles.selekotvaniRed;
              }
              return '';
            }}
            onRowClick={(rowData) => {
              setSelPitanjeId(prev => {
                if (prev === rowData.id) {
                  return 0;
                }
                return rowData.id
              })
            }}
            rowHeight={60}
            data={pitanja}
          >
            <Table.Column width={100} resizable >
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.Cell dataKey='id' />
            </Table.Column>
            <Table.Column resizable width={200}>
              <Table.HeaderCell>Pitanje</Table.HeaderCell>
              <Table.Cell dataKey='tekstPitanja' />
            </Table.Column>
            <Table.Column resizable width={140}>
              <Table.HeaderCell>Broj poena</Table.HeaderCell>
              <Table.Cell dataKey='brojPoena' />
            </Table.Column>
            <Table.Column resizable width={160}>
              <Table.HeaderCell>Kviz</Table.HeaderCell>
              <Table.Cell>
                {pitanje => pitanje.kviz.naziv}
              </Table.Cell>
            </Table.Column>
            <Table.Column resizable width={140}>
              <Table.HeaderCell>Ukupan broj odgovora</Table.HeaderCell>
              <Table.Cell>{pitanje => pitanje.opcije.length}</Table.Cell>
            </Table.Column>
            <Table.Column resizable width={140}>
              <Table.HeaderCell>Broj tacnih odgovora</Table.HeaderCell>
              <Table.Cell>{
                (pitanje: AdminPitanje) => pitanje.opcije.filter(opcija => opcija.tacna).length
              }</Table.Cell>
            </Table.Column>
          </Table>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={9}>
          <h2>{selPitanjeId === 0 ? 'Kreiraj' : 'Izmeni'} pitanje</h2>
          <Form
            model={model}
            formValue={formaPitanje}
            onChange={val => {
              //@ts-ignore
              setFormaPitanje(prev => {
                return {
                  ...prev,
                  ...val
                }
              });
            }}
            checkTrigger='blur'
            onSubmit={async ch => {
              if (!ch) {
                return;
              }
              if (formaPitanje.opcije.find((element: Opcija) => {
                return element.naziv.trim().length === 0 && formaPitanje.find((e1: Opcija) => e1.naziv === element.naziv && e1 !== element) != undefined;
              }) !== undefined) {
                return;
              }

              if (selPitanjeId === 0) {
                const novoPitanje = await kreirajPitanje({
                  ...formaPitanje,
                  kviz: {
                    id: formaPitanje.kvizId
                  }
                });
                setPitanja(prev => {
                  return [
                    ...prev,
                    novoPitanje
                  ]
                })
                setFormaPitanje({});
              } else {
                const izmenjenoPitanje = await izmeniPitanje(selPitanjeId, {
                  ...formaPitanje,
                  kviz: {
                    id: formaPitanje.kvizId
                  }
                })
                setPitanja(prev => {
                  return prev.map(element => {
                    if (element.id === selPitanjeId) {
                      return izmenjenoPitanje;
                    }
                    return element;
                  })
                })
                setSelPitanjeId(0);
              }
            }}
          >
            <Form.Group>
              <Form.ControlLabel>Kviz</Form.ControlLabel>
              <Form.Control className={styles.fluid} name="kvizId" accepter={SelectPicker} onSearch={setKvizSearch} data={kvizovi.map(element => {
                return {
                  value: element.id,
                  label: element.naziv
                }
              })} />
            </Form.Group>
            <Form.Group controlId="brojPoena">
              <Form.ControlLabel>Broj poena</Form.ControlLabel>
              <Form.Control className={styles.fluid} name="brojPoena" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Tekst pitanja</Form.ControlLabel>
              <Form.Control className={styles.fluid} name="tekstPitanja" accepter={Textarea} />
            </Form.Group>
            <div className={styles.red}>
              <h3>Opcije</h3>
              <IconButton appearance='default' type='button' onClick={() => {
                setFormaPitanje((prev: any) => {
                  return {
                    ...prev,
                    opcije: [
                      ...(prev.opcije || []),
                      {
                        tacna: false,
                        naziv: ''
                      }
                    ]
                  }
                })
              }} icon={<PlusIcon />} />
            </div>
            {
              (formaPitanje.opcije || []).map((opcija: Opcija) => {
                return (
                  <div className={classNames(styles.marginTop, styles.red)}>
                    <Input value={opcija.naziv} onChange={(val) => {
                      setFormaPitanje((prev: any) => {
                        return {
                          ...prev,
                          opcije: prev.opcije.map((element: Opcija) => {
                            if (element === opcija) {
                              return {
                                ...element,
                                naziv: val
                              }
                            }
                            return element;
                          })
                        }
                      })
                    }} />
                    <Checkbox
                      checked={opcija.tacna}
                      onChange={(value, checked) => {
                        setFormaPitanje((prev: any) => {
                          return {
                            ...prev,
                            opcije: prev.opcije.map((element: Opcija) => {
                              if (element === opcija) {
                                return {
                                  ...element,
                                  tacna: checked
                                }
                              }
                              return element;
                            })
                          }
                        })
                      }}
                    >Tacan</Checkbox>
                    <IconButton style={{ marginLeft: '10px' }} onClick={() => {
                      setFormaPitanje((prev: any) => {
                        return {
                          ...prev,
                          opcije: prev.opcije.filter((e: Opcija) => e !== opcija)
                        }
                      })
                    }} icon={<TrashIcon />} />
                  </div>
                )
              })
            }
            <Button className={classNames(styles.marginTop, styles.fluid)} type='submit' appearance='primary'>Sacuvaj</Button>

          </Form>
          {
            selPitanjeId > 0 && (
              <Button className={classNames(styles.marginTop, styles.fluid, styles.danger)} onClick={async () => {
                const id = selPitanjeId;
                await obrisiPitanje(selPitanjeId);
                setSelPitanjeId(0);
                setPitanja(prev => {
                  return prev.filter(element => element.id !== id);
                })
              }}>Obrisi</Button>
            )
          }
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
}
