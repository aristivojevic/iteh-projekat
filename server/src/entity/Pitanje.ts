import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Kviz } from "./Kviz";

@Entity()
export class Pitanje {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tekstPitanja: string;

  @Column()
  brojPoena: number;

  @ManyToOne(() => Kviz)
  kviz: Kviz;


  @Column({
    transformer: {
      to: (value) => JSON.stringify(value),
      from: (value) => JSON.parse(value)
    },
    type: 'json'
  })
  opcije: Opcija[]
}


export interface Opcija {
  naziv: string,
  tacna: boolean
}