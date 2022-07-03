import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'rsuite';
import { Kviz } from '../tipovi';
import styles from '../App.module.css';
import classNames from 'classnames';

interface Props {
  kviz: Kviz
}

export default function KvizKartica(props: Props) {
  return (
    <div className={styles.kursKarticaContainer}>
      <div className={classNames(styles.red, styles.fluid)}>
        <div className={styles.kursNaziv}>
          {props.kviz.naziv}
        </div>
        <div>
          <Link to={'/kviz/' + props.kviz.id}>
            <Button className={styles.kvizDugme}>Zapocni kviz</Button>
          </Link>
        </div>
      </div>
      <div className={classNames(styles.red, styles.fluid)}>
        <div className={styles.kursNaziv}>
          Broj pitanja: {props.kviz.pitanja.length}
        </div>
        {
          props.kviz.pokusaj && (
            <div className={styles.kursNaziv}>
              Poslednji pokusaj: {props.kviz.pokusaj.brojPoena} poena
            </div>
          )
        }
      </div>
    </div>
  );
}
