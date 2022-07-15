import { Request, Response } from "express";
import { Like } from "typeorm";
import { appDataSource } from "../dataSource";
import { Kurs } from "../entity/Kurs";
import { Kviz } from "../entity/Kviz";
import { Pitanje } from "../entity/Pitanje";
import { Pokusaj } from "../entity/Pokusaj";
import { User } from "../entity/User";

// Kurs

export async function kreirajKurs(req: Request, res: Response) {
  const kursRepository = appDataSource.getRepository(Kurs);

  const kurs = await kursRepository.save(req.body);
  res.json(kurs);
}
export async function obrisiKurs(req: Request, res: Response) {
  try {
    const kursRepository = appDataSource.getRepository(Kurs);
    await kursRepository.delete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}

// Kviz

export async function kreirajKviz(req: Request, res: Response) {
  const kvizRepository = appDataSource.getRepository(Kviz);

  const kviz = await kvizRepository.save(req.body);
  res.json(kviz);
}
export async function obrisiKviz(req: Request, res: Response) {
  try {
    const kvizRepository = appDataSource.getRepository(Kviz);
    await kvizRepository.delete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}

// Pitanje

export async function kreirajPitanje(req: Request, res: Response) {
  const pitanjeRepository = appDataSource.getRepository(Pitanje);

  // kreiranje pitanja
  const pitanje = await pitanjeRepository.save(req.body);

  // vracamo i kviz i kreirano pitanje
  const kviz = await appDataSource.getRepository(Kviz).findOne({
    where: {
      id: req.body.kviz.id,
    },
  });
  res.json({ ...pitanje, kviz });
}
export async function obrisiPitanje(req: Request, res: Response) {
  try {
    const pitanjeRepository = appDataSource.getRepository(Pitanje);
    await pitanjeRepository.delete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function vratiSvaPitanja(req: Request, res: Response) {
  // spisak pitanja na frontu

  res.json(
    await appDataSource.getRepository(Pitanje).find({
      relations: ["kviz"],
    })
  );
}

export async function izmeniPitanje(req: Request, res: Response) {
  const id = req.params.id;
  const body = req.body;

  // sacuvas pitanje
  const pitanje = await appDataSource.getRepository(Pitanje).save({
    ...body,
    id: parseInt(id),
  });

  // vratis kviz i izmenjeno pitanje
  const kviz = await appDataSource.getRepository(Kviz).findOne({
    where: {
      id: body.kviz.id,
    },
  });
  res.json({ ...pitanje, kviz });
}

interface StatistikaKviza {
  idKviza: number;
  nazivKviza: string;
  prosek: number;
  maks: number;
  brojPokusaja: number;
}

export async function vratiStatistiku(req: Request, res: Response) {
  let nizStatistika: StatistikaKviza[] = [];
  const pokusaji = await appDataSource.getRepository(Pokusaj).find();
  const kvizovi = await appDataSource.getRepository(Kviz).find();

  // racunanje
  for (let pokusaj of pokusaji) {
    let item = nizStatistika.find((e) => e.idKviza === pokusaj.kvizId);
    const kviz = kvizovi.find((e) => e.id === pokusaj.kvizId);
    if (!item) {
      item = {
        brojPokusaja: 0,
        idKviza: kviz.id,
        nazivKviza: kviz.naziv,
        maks: kviz.pitanja.reduce((acc, element) => {
          return acc + element.brojPoena;
        }, 0),
        prosek: 0,
      };
      nizStatistika.push(item);
    }
    item.prosek =
      (item.prosek * item.brojPokusaja + pokusaj.brojPoena) /
      (item.brojPokusaja + 1);
    item.brojPokusaja = item.brojPokusaja + 1;
  }

  res.json(nizStatistika);
}

export async function vratiSveKvizove(req: Request, res: Response) {
  const size = (req.query as any).size || 20;
  const page = (req.query as any).page || 0;
  const naziv = (req.query as any).naziv || "";
  const sortType = (req.query as any).sortType || "ASC";
  const sortColumn = (req.query as any).sortColumn || "id";
  const kvizRepository = appDataSource.getRepository(Kviz);

  const [kvizovi, total] = await kvizRepository.findAndCount({
    relations: ["kurs"],
    where: {
      naziv: Like(naziv + "%"),
    },
    order: {
      [sortColumn]: sortType,
    },
    take: size,
    skip: page * size,
  });

  res.json({
    content: kvizovi,
    totalElements: total,
  });
}
