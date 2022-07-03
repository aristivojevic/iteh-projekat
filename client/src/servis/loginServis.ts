import { LoginUser, RegisterUser, User } from '../tipovi'
import axios from 'axios'

export async function register(user: RegisterUser) {
  const res = await axios.post('/register', user);
  const token = res.data.token;
  localStorage.setItem('user-token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return res.data as User;
}

export async function check() {
  const token = localStorage.getItem('user-token');
  if (!token) {
    throw new Error('no token');
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const res = await axios.get('/check');
  return res.data;
}
export async function login(user: LoginUser) {
  const res = await axios.post('/login', user);
  const token = res.data.token;
  localStorage.setItem('user-token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return res.data as User;
}
export async function logout() {
  delete axios.defaults.headers.common['Authorization'];
  localStorage.removeItem('user-token');
}