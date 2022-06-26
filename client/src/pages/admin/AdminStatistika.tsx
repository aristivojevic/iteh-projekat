import React, { useEffect, useState } from 'react';
import { vratiStatistiku } from '../../servis/kvizServis';
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip } from 'recharts'
interface StatistikaItem {
  idKviza: number,
  nazivKviza: string,
  prosek: number,
  maks: number,
  brojPokusaja: number
}

export default function AdminStatistika() {
  const [statistika, setStatistika] = useState<StatistikaItem[]>([]);

  useEffect(() => {
    vratiStatistiku().then(setStatistika)
  })
  return (
    <div className='ekran white maliPadding'>
      <div className='textCentar'>
        Prosecan broj poena po kvizovima
      </div>
      <div className='center marginTop'>
        <BarChart
          width={1200}
          height={800}
          data={statistika.map(element => {
            return {
              nazivKviza: element.nazivKviza,
              prosek: 100 * element.prosek / element.maks
            }
          })}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nazivKviza" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="prosek" name='Prosek(%)' fill="#8884d8" />
        </BarChart>
      </div>
    </div>);
}
