import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Pitanje, OdgovorDto } from '../tipovi';
import { submitujKviz, vratiPitanjaIzKviza } from '../servis/kvizServis'
import PitanjeKartica from '../components/PitanjeKartica';
import { Button } from 'rsuite';
import Prompt from '../components/Prompt';
import styles from '../App.module.css';
import classNames from 'classnames';

export default function KvizPage() {
  const params = useParams();
  const id = Number(params.id);
  const [pitanja, setPitanja] = useState<Pitanje[]>([])
  const [odgovori, setOdgovori] = useState<OdgovorDto[]>([]);
  const [openModal, setOpenModal] = useState(false)
  const [brojPoena, setBrojPoena] = useState<number | undefined>(undefined);
  useEffect(() => {
    setOdgovori(pitanja.map(element => {
      return {
        id: element.id,
        selektovaneOpcije: []
      }
    }))
  }, [pitanja])

  useEffect(() => {
    vratiPitanjaIzKviza(id).then(setPitanja);
  }, [])
  return (
    <div
      className={classNames(styles.ekran, styles.maliPadding, styles.marginBotton)}
    >
      <Prompt
        open={openModal}
        onNo={() => { setOpenModal(false) }}
        sadrzaj='Klikom na "Da" vrsi se submitovanje kviza'
        onYes={async () => {
          const brojP = await submitujKviz(id, odgovori);
          setBrojPoena(brojP);
          setOpenModal(false)
        }}
      />
      {
        brojPoena !== undefined && (
          <div className={styles.textPitanja}>
            Broj poena: {brojPoena}
          </div>
        )
      }
      {pitanja.map(element => {
        return (
          <PitanjeKartica
            pitanje={element}
            selektovaniOdgovori={odgovori.find(e => e.id === element.id)?.selektovaneOpcije || []}
            onChange={(value, check) => {
              setOdgovori(prev => {
                return prev.map(odgovor => {
                  if (odgovor.id !== element.id) {
                    return odgovor;
                  }
                  if (check) {
                    return {
                      ...odgovor,
                      selektovaneOpcije: [...odgovor.selektovaneOpcije, value]
                    }
                  }
                  return {
                    ...odgovor,
                    selektovaneOpcije: odgovor.selektovaneOpcije.filter(e => e !== value)
                  }
                })
              })
            }}
          />
        )
      })}
      {
        brojPoena === undefined && (
          <Button onClick={() => {
            setOpenModal(true);
          }}
            className={classNames(styles.fluid, styles.danger, styles.marginTop, styles.marginBotton)}
          >Submituj kviz</Button>
        )
      }
    </div>
  )
}
