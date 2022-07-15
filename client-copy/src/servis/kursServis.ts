import axios from 'axios'
import { Kurs } from '../tipovi';

export async function vratiSveKurseve() {
  const res = await axios.get('/kurs');
  return res.data;
}

export async function vratiKvizoveIzKursa(id: number) {
  const res = await axios.get('/kurs/' + id + '/kviz');
  return res.data;
}
export async function kreirajKurs(kurs: Partial<Kurs>) {
  const res = await axios.post('/kurs', kurs);
  return res.data;
}

export async function obrisiKurs(id: number) {
  await axios.delete('/kurs/' + id);
}