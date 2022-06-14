import { Request, Response } from "express";
import { appDataSource } from "../dataSource";
import { Kurs } from "../entity/Kurs";
import { Kviz } from '../entity/Kviz'
import { Pitanje } from "../entity/Pitanje";
import { Pokusaj } from "../entity/Pokusaj";
import { User } from "../entity/User";

export async function kreirajKurs(req: Request, res: Response) {
  const kursRepository = appDataSource.getRepository(Kurs);

  const kurs = await kursRepository.save(req.body);
  res.json(kurs);
}
export async function obrisiKurs(req: Request, res: Response) {
  const kursRepository = appDataSource.getRepository(Kurs);
  try {

    await kursRepository.delete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function kreirajKviz(req: Request, res: Response) {
  const kvizRepository = appDataSource.getRepository(Kviz);

  const kviz = await kvizRepository.save(req.body);
  res.json(kviz);
}
export async function obrisiKviz(req: Request, res: Response) {
  const kvizRepository = appDataSource.getRepository(Kviz);
  await kvizRepository.delete(req.params.id);
  res.sendStatus(204);
}

export async function vratiSvaPitanja(req: Request, res: Response) {
  res.json(
    await appDataSource.getRepository(Pitanje).find({
      relations: ['kviz']
    })
  )
}

export async function kreirajPitanje(req: Request, res: Response) {
  const pitanjeRepository = appDataSource.getRepository(Pitanje);

  const pitanje = await pitanjeRepository.save(req.body);
  const kviz = await appDataSource.getRepository(Kviz).findOne({
    where: {
      id: req.body.kviz.id
    }
  })
  res.json({ ...pitanje, kviz });
}
export async function obrisiPitanje(req: Request, res: Response) {
  const pitanjeRepository = appDataSource.getRepository(Pitanje);
  await pitanjeRepository.delete(req.params.id);
  res.sendStatus(204);
}

export async function izmeniPitanje(req: Request, res: Response) {
  const id = req.params.id;
  const body = req.body;
  const pitanje = await appDataSource.getRepository(Pitanje).save({
    ...body,
    id: parseInt(id)
  });
  const kviz = await appDataSource.getRepository(Kviz).findOne({
    where: {
      id: body.kviz.id
    }
  })
  res.json({ ...pitanje, kviz });
}

interface StatistikaItem {
  idKviza: number,
  nazivKviza: string,
  prosek: number,
  maks: number,
  brojPokusaja: number
}

export async function vratiStatistiku(req: Request, res: Response) {
  let itemi: StatistikaItem[] = [];
  const pokusaji = await appDataSource.getRepository(Pokusaj).find();
  const kvizovi = await appDataSource.getRepository(Kviz).find();
  for (let pokusaj of pokusaji) {
    let item = itemi.find(e => e.idKviza === pokusaj.kvizId);
    const kviz = kvizovi.find(e => e.id === pokusaj.kvizId);
    if (!item) {
      item = {
        brojPokusaja: 0,
        idKviza: kviz.id,
        nazivKviza: kviz.naziv,
        maks: kviz.pitanja.reduce((acc, element) => { return acc + element.brojPoena }, 0),
        prosek: 0
      }
      itemi.push(item)
    }
    item.prosek = (item.prosek * item.brojPokusaja + pokusaj.brojPoena) / (item.brojPokusaja + 1);
    item.brojPokusaja = item.brojPokusaja + 1;
  }
  res.json(itemi);
}