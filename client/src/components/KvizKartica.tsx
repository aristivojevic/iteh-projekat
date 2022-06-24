import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'rsuite';
import { Kviz } from '../tipovi';

interface Props {
  kviz: Kviz
}

export default function KvizKartica(props: Props) {
  return (
    <div className='kursKarticaContainer'>
      <div className='red fluid'>
        <div className='kursNaziv'>
          {props.kviz.naziv}
        </div>
        <div>
          <Link to={'/kviz/' + props.kviz.id}>
            <Button className='kvizDugme'>Zapocni kviz</Button>
          </Link>
        </div>
      </div>
      <div className='red fluid'>
        <div className='kursNaziv'>
          Broj pitanja: {props.kviz.pitanja.length}
        </div>
        {
          props.kviz.pokusaj && (
            <div className='kursNaziv'>
              Poslednji pokusaj: {props.kviz.pokusaj.brojPoena} poena
            </div>
          )
        }
      </div>
    </div>
  );
}
