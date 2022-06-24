import axios from 'axios'
import { KvizOdgovor, KvizSearch, OdgovorDto, Pitanje } from '../tipovi';
axios.defaults.withCredentials = true;
const SERVER_URL = 'https://localhost:8000'


export async function vratiKvizove(searchObj: Partial<KvizSearch>) {
  const res = await axios.get(SERVER_URL + '/kviz', {
    params: searchObj
  })
  return res.data as KvizOdgovor;
}

export async function kreirajKviz(naziv: string, kursId: number) {
  const res = await axios.post(SERVER_URL + '/kviz', {
    naziv,
    kurs: {
      id: kursId
    }
  })
  return res.data;
}

export async function obrisiKviz(id: number) {
  return axios.delete(SERVER_URL + '/kviz/' + id);
}

export async function vratiPitanjaIzKviza(id: number) {
  const res = await axios.get(SERVER_URL + '/kviz/' + id + '/pitanje')
  return res.data as Pitanje[];
}
export async function submitujKviz(id: number, data: OdgovorDto[]) {
  const res = await axios.post(SERVER_URL + `/kviz/${id}/submituj`, data)
  return res.data.brojPoena as number;
}
export async function vratiStatistiku() {
  const res = await axios.get(SERVER_URL + '/statistika');
  return res.data;
}