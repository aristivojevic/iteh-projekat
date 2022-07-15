import React from 'react'
import { Pitanje } from '../tipovi'
import { Checkbox } from 'rsuite'
import styles from '../App.module.css';
interface Props {
  pitanje: Pitanje,
  selektovaniOdgovori: string[],
  onChange: (odgovor: string, check: boolean) => void
}

export default function PitanjeKartica(props: Props) {
  return (
    <div className={styles.pitanjeContainer}>
      <div className={styles.red}>
        <div className={styles.textPitanja}>
          {props.pitanje.tekstPitanja}
        </div>
        <div className={styles.opcijeTekst}>
          Broj poena: {props.pitanje.brojPoena}
        </div>
      </div>
      <div>
        <div className={styles.opcijeTekst}>
          Ponudjeni odgovori
        </div>
        <div>
          {
            props.pitanje.opcije.map(element => {
              return (
                <div className={styles.odgovor}>
                  <Checkbox
                    checked={props.selektovaniOdgovori.includes(element)}
                    onChange={(va, ch) => {
                      props.onChange(element, ch);
                    }}
                  >{element}</Checkbox>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
