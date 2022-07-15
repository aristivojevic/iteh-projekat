import React from 'react';
import { Link } from 'react-router-dom';
import { Kurs } from '../tipovi';
import styles from '../App.module.css';
interface Props {
  kurs: Kurs
}

export default function KursKartica(props: Props) {
  return (
    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={'/kursevi/' + props.kurs.id}>
      <div className={styles.kursKarticaContainer}>
        <div className={styles.kursNaziv}>{props.kurs.naziv}</div>
        <div className={styles.kursOpis}>{props.kurs.opis}</div>
      </div>
    </Link>
  );
}
