import React from 'react'
import { Pitanje } from '../tipovi'
import { Checkbox } from 'rsuite'
interface Props {
  pitanje: Pitanje,
  selektovaniOdgovori: string[],
  onChange: (odgovor: string, check: boolean) => void
}

export default function PitanjeKartica(props: Props) {
  return (
    <div className='pitanjeContainer'>
      <div className='red'>
        <div className='textPitanja'>
          {props.pitanje.tekstPitanja}
        </div>
        <div className='opcijeTekst'>
          Broj poena: {props.pitanje.brojPoena}
        </div>
      </div>
      <div>
        <div className='opcijeTekst'>
          Ponudjeni odgovori
        </div>
        <div>
          {
            props.pitanje.opcije.map(element => {
              return (
                <div className='odgovor'>
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
