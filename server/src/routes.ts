import { Request, Response } from "express";
import { izmeniPitanje, kreirajKurs, kreirajKviz, kreirajPitanje, obrisiKurs, obrisiKviz, obrisiPitanje, vratiStatistiku, vratiSvaPitanja } from "./controller/AdminController";
import { submitujKviz, vratiSvaPitanjaIzKviza, vratiSveKurseve, vratiSveKvizove, vratiSveKvizoveIzKursa } from "./controller/ClientController";


interface Route {
  method: 'get' | 'post' | 'patch' | 'delete',
  url: string,
  handler: (req: Request, res: Response) => any
}


export const Routes: Route[] = [{
  method: 'get',
  url: '/kurs',
  handler: vratiSveKurseve
}, {
  method: 'get',
  url: '/kurs/:id/kviz',
  handler: vratiSveKvizoveIzKursa
}, {
  method: 'get',
  url: '/kviz/:id/pitanje',
  handler: vratiSvaPitanjaIzKviza
}, {
  method: 'post',
  url: '/kviz/:id/submituj',
  handler: submitujKviz
}, {
  method: 'get',
  url: '/kviz',
  handler: vratiSveKvizove
}];

export const AdminRoutes: Route[] = [{
  method: "post",
  url: '/kurs',
  handler: kreirajKurs
}, {
  method: 'delete',
  url: '/kurs/:id',
  handler: obrisiKurs
}, {
  method: "post",
  url: '/kviz',
  handler: kreirajKviz
}, {
  method: 'delete',
  url: '/kviz/:id',
  handler: obrisiKviz
},
{
  method: 'get',
  url: '/pitanje',
  handler: vratiSvaPitanja
},
{
  method: "post",
  url: '/pitanje',
  handler: kreirajPitanje
}, {
  method: 'patch',
  url: '/pitanje/:id',
  handler: izmeniPitanje
}, {
  method: 'delete',
  url: '/pitanje/:id',
  handler: obrisiPitanje
}, {
  method: 'get',
  url: '/statistika',
  handler: vratiStatistiku
}]