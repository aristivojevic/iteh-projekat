const util = require("util");

import { Request, Response } from "express";
import { Like } from "typeorm";
import { appDataSource } from "../dataSource";
import { Kurs } from "../entity/Kurs";
import { Kviz } from "../entity/Kviz";
import { Pitanje } from "../entity/Pitanje";
import { Pokusaj } from "../entity/Pokusaj";
import { User } from "../entity/User";

export async function vratiSveKurseve(req: Request, res: Response) {
  const kursRepository = appDataSource.getRepository(Kurs);
  res.json(await kursRepository.find());
}

export async function vratiSveKvizoveIzKursa(req: Request, res: Response) {
  const kursId = req.params.id;
  const kursRepository = appDataSource.getRepository(Kurs);

  const kurs = await kursRepository.findOne({
    where: {
      id: Number(kursId),
    },
  });

  const kvizovi = kurs.kvizovi;

  kvizovi.forEach(
    (kviz) => ((kviz as any).pokusaj = kviz.pokusaji[kviz.pokusaji.length - 1])
  );

  res.json(kvizovi);
}

export async function vratiSvaPitanjaIzKviza(req: Request, res: Response) {
  const pitanjeRepository = appDataSource.getRepository(Pitanje);
  const pitanja = await pitanjeRepository.find({
    where: {
      kviz: {
        id: Number(req.params.id),
      },
    },
  });

  res.json(
    pitanja.map((pitanje) => {
      return {
        ...pitanje,
        opcije: pitanje.opcije.map((opcija) => opcija.naziv),
      };
    })
  );
}

interface OdgovorDto {
  id: number;
  selektovaneOpcije: string[];
}

export async function submitujKviz(req: Request, res: Response) {
  const body = req.body as OdgovorDto[];
  const kvizId = Number(req.params.id);
  const pitanjeRepository = appDataSource.getRepository(Pitanje);
  const pitanja = await pitanjeRepository.find({
    where: {
      kviz: {
        id: kvizId,
      },
    },
  });

  // algoritam za racunanje poena na predmetu osnovi organizacije
  let rezultat = 0;
  for (let pitanje of pitanja) {
    let rezultatPitanja = 0;
    const odgovor = body.find((e) => e.id === pitanje.id);
    for (let opcija of pitanje.opcije) {
      const pogodio =
        odgovor.selektovaneOpcije.includes(opcija.naziv) === opcija.tacna;
      if (pogodio) {
        rezultatPitanja = rezultatPitanja + 1;
      } else {
        rezultatPitanja = rezultatPitanja - 1;
      }
    }
    rezultat += (pitanje.brojPoena * rezultatPitanja) / pitanje.opcije.length;
  }

  // pravljenje pokusaja
  const pokusajRepository = appDataSource.getRepository(Pokusaj);
  await pokusajRepository.save({
    brojPoena: rezultat,
    kvizId: Number(kvizId),
    userId: (req as any).user.id,
  });
  res.json({
    brojPoena: rezultat,
  });
}
