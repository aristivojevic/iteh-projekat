import React, { useEffect, useState } from 'react';
import KursKartica from '../components/KursKartica';
import { vratiSveKurseve } from '../servis/kursServis';
import { Kurs } from '../tipovi';
import { chunk } from '../util';

export default function KurseviPage() {

  const [kursevi, setKursevi] = useState<Kurs[]>([]);

  useEffect(() => {
    vratiSveKurseve().then(setKursevi);
  }, [])

  return (
    <div className='maliPadding'>
      <h1 style={{ textAlign: 'center', width: '100%' }} >Spisak kurseva</h1>

      {
        chunk(kursevi, 4).map(red => {
          return (
            <div className='red maliPadding ekran'>
              {
                red.map(kurs => {
                  return <div className='kolona'>
                    <KursKartica key={kurs.id} kurs={kurs} />
                  </div>
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}
