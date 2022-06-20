import React from 'react';
import { Link } from 'react-router-dom';
import { Kurs } from '../tipovi';
interface Props {
  kurs: Kurs
}

export default function KursKartica(props: Props) {
  return (
    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={'/kursevi/' + props.kurs.id}>
      <div className='kursKarticaContainer'>
        <div className='kursNaziv'>{props.kurs.naziv}</div>
        <div className='kursOpis'>{props.kurs.opis}</div>
      </div>
    </Link>
  );
}
