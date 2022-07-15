import axios from 'axios'
import { AdminPitanje } from '../tipovi';


export async function vratiSvaPitanja() {
  const res = await axios.get('/pitanje')
  return res.data as AdminPitanje[];
}

export async function kreirajPitanje(data: any) {
  const res = await axios.post('/pitanje', data);
  return res.data as AdminPitanje;
}
export async function izmeniPitanje(id: number, data: any) {
  const res = await axios.patch('/pitanje/' + id, data);
  return res.data as AdminPitanje;
}
export async function obrisiPitanje(id: number) {
  return axios.delete('/pitanje/' + id);
}