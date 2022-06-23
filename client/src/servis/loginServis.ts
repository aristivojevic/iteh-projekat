import { LoginUser, RegisterUser, User } from '../tipovi'
import axios from 'axios'
axios.defaults.withCredentials = true;
const SERVER_URL = 'https://localhost:8000'
export async function register(user: RegisterUser) {
  const res = await axios.post(SERVER_URL + '/register', user);
  return res.data as User;
}

export async function check() {
  const res = await axios.get(SERVER_URL + '/check');
  return res.data;
}
export async function login(user: LoginUser) {
  const res = await axios.post(SERVER_URL + '/login', user);
  return res.data as User;
}
export async function logout() {
  await axios.post(SERVER_URL + '/logout');
}