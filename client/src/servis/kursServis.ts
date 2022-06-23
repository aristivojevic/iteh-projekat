import axios from 'axios'
import { Kurs } from '../tipovi';
axios.defaults.withCredentials = true;
const SERVER_URL = 'https://localhost:8000'

export async function vratiSveKurseve() {
  const res = await axios.get(SERVER_URL + '/kurs');
  return res.data;
}

export async function vratiKvizoveIzKursa(id: number) {
  const res = await axios.get(SERVER_URL + '/kurs/' + id + '/kviz');
  return res.data;
}
export async function kreirajKurs(kurs: Partial<Kurs>) {
  const res = await axios.post(SERVER_URL + '/kurs', kurs);
  return res.data;
}

export async function obrisiKurs(id: number) {
  await axios.delete(SERVER_URL + '/kurs/' + id);
}