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
  const kvizRepository = appDataSource.getRepository(Kviz);
  const kvizovi = await kvizRepository.find({
    where: {
      kurs: {
        id: Number(req.params.id)
      }
    }
  })
  const user = (req as any).user as User;
  const rezultat = await Promise.all(kvizovi.map(async kviz => {
    const pokusaji = await appDataSource.getRepository(Pokusaj).find({
      where: {
        kvizId: kviz.id,
        userId: user.id
      }
    })
    return {
      ...kviz,
      pokusaj: (pokusaji.length === 0) ? undefined : pokusaji[pokusaji.length - 1]
    }
  }))
  res.json(rezultat);
}
export async function vratiSvaPitanjaIzKviza(req: Request, res: Response) {
  const pitanjeRepository = appDataSource.getRepository(Pitanje)
  const pitanja = await pitanjeRepository.find({
    where: {
      kviz: {
        id: Number(req.params.id)
      }
    }
  })
  res.json(pitanja.map(element => {
    return {
      ...element,
      opcije: element.opcije.map(opcija => {
        return opcija.naziv
      })
    }
  }));
}

interface OdgovorDto {
  id: number,
  selektovaneOpcije: string[]
}

export async function submitujKviz(req: Request, res: Response) {
  const body = req.body as OdgovorDto[];
  const id = Number(req.params.id);
  const pitanjeRepository = appDataSource.getRepository(Pitanje);
  const pitanja = await pitanjeRepository.find({
    where: {
      kviz: {
        id: id
      }
    }
  });
  let rezultat = 0;
  for (let pitanje of pitanja) {
    let rezultatPitanja = 0;
    const odgovor = body.find(e => e.id === pitanje.id);
    for (let opcija of pitanje.opcije) {
      const pogodio = odgovor.selektovaneOpcije.includes(opcija.naziv) === opcija.tacna;
      if (pogodio) {
        rezultatPitanja = rezultatPitanja + 1;
      } else {
        rezultatPitanja = rezultatPitanja - 1;
      }
    }
    rezultat += rezultatPitanja * pitanje.brojPoena / pitanje.opcije.length;
  }
  const pokusajRepository = appDataSource.getRepository(Pokusaj);
  await pokusajRepository.save({
    brojPoena: rezultat,
    kvizId: Number(id),
    userId: (req as any).user.id,
  })
  res.json({
    brojPoena: rezultat
  });
}
export async function vratiSveKvizove(req: Request, res: Response) {
  const size = (req.query as any).size || 20;
  const page = (req.query as any).page || 0;
  const naziv = (req.query as any).naziv || '';
  const sortType = (req.query as any).sortType || 'ASC';
  const sortColumn = (req.query as any).sortColumn || 'id';
  const kvizRepository = appDataSource.getRepository(Kviz);
  const [kvizovi, total] = await kvizRepository.findAndCount({
    relations: ['kurs'],
    where: {
      naziv: Like(naziv + '%')
    },
    order: {
      [sortColumn]: sortType
    },
    take: size,
    skip: page * size
  })
  res.json({
    content: kvizovi,
    totalElements: total
  });
}