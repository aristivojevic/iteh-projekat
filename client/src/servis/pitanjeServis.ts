import axios from 'axios'
import { AdminPitanje } from '../tipovi';
axios.defaults.withCredentials = true;
const SERVER_URL = 'https://localhost:8000'


export async function vratiSvaPitanja() {
  const res = await axios.get(SERVER_URL + '/pitanje')
  return res.data as AdminPitanje[];
}

export async function kreirajPitanje(data: any) {
  const res = await axios.post(SERVER_URL + '/pitanje', data);
  return res.data as AdminPitanje;
}
export async function izmeniPitanje(id: number, data: any) {
  const res = await axios.patch(SERVER_URL + '/pitanje/' + id, data);
  return res.data as AdminPitanje;
}
export async function obrisiPitanje(id: number) {
  return axios.delete(SERVER_URL + '/pitanje/' + id);
}