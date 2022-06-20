export interface User {
  id: number,
  firstName: string,
  lastName: string,
  age: number,
  username: string,
  category: 'user' | 'admin',
  pokusaji?: Pokusaj[]
}

export interface RegisterUser {
  firstName: string,
  lastName: string,
  age: number | string,
  username: string,
  password: string,
  repeat?: string
}
export interface LoginUser {
  username: string,
  password: string,
}
export interface Kurs {
  id: number,
  naziv: string,
  opis: string
}
export interface Kviz {
  id: number,
  naziv: string,
  kurs?: Kurs,
  pitanja: Pitanje[],
  pokusaj?: Pokusaj
}
export interface Pitanje {
  id: number,
  tekstPitanja: string,
  brojPoena: number,
  opcije: string[]
}
export interface Opcija {
  naziv: string,
  tacna: boolean
}
export interface AdminPitanje {
  id: number,
  kviz: Kviz,
  tekstPitanja: string,
  brojPoena: number,
  opcije: Opcija[]
}
export interface Pokusaj {
  brojPoena: number,
  userId: number,
  kvizId: number
}

export interface KvizSearch {
  size: number,
  page: number,
  naziv: string,
  sortType: 'ASC' | 'DESC',
  sortColumn: 'id' | 'naziv',
}
export interface KvizOdgovor {
  totalElements: number,
  content: Kviz[]
}
export interface OdgovorDto {
  id: number,
  selektovaneOpcije: string[]
}