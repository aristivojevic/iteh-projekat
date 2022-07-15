import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Loader } from 'rsuite';
import Navbar from './components/Navbar';
import AdminKursevi from './pages/admin/AdminKursevi';
import AdminKvizovi from './pages/admin/AdminKvizovi';
import AdminPitanja from './pages/admin/AdminPitanja';
import AdminStatistika from './pages/admin/AdminStatistika';
import KurseviPage from './pages/KurseviPage';
import KursPage from './pages/KursPage';
import KvizPage from './pages/KvizPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { check, login, logout, register } from './servis/loginServis';
import { User } from './tipovi';


// axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.baseURL = '/api'
axios.defaults.validateStatus = status => status >= 200 && status < 400;


function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    check().then(res => {
      setUser(res);
    }).catch((err) => {
      navigation('/')
    }).finally(() => {
      setLoading(false)
    });
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      navigation('/');
    }
  }, [user, loading])
  if (loading) {
    return (
      <Loader />
    )
  }
  if (user === undefined) {
    return <Routes>
      <Route path='/' element={<LoginPage onSubmit={async data => {
        const res = await login(data);
        setUser(res);
      }} />} />
      <Route path='/register' element={<RegisterPage onSubmit={async (data) => {
        const user1 = await register(data);
        setUser(user1);
      }} />} />
    </Routes>
  }
  if (user.category === 'user') {
    return (
      <>
        <Navbar onLogout={async () => {
          await logout();
          setUser(undefined);
        }} />
        <Routes>
          <Route path='/kursevi' element={<KurseviPage />} />
          <Route path='/kursevi/:id' element={<KursPage />} />
          <Route path='/kviz/:id' element={<KvizPage />} />
          <Route path='/' element={<KurseviPage />} />
        </Routes>
      </>
    )
  }
  return (
    <>
      <Navbar isAdmin onLogout={async () => {
        await logout();
        setUser(undefined);
      }} />
      <Routes>
        <Route path='/kursevi' element={<AdminKursevi />} />
        <Route path='/kvizovi' element={<AdminKvizovi />} />
        <Route path='/pitanja' element={<AdminPitanja />} />
        <Route path='/statistika' element={<AdminStatistika />} />
      </Routes>

    </>
  )
}

export default App;
