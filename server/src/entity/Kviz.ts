import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Kurs } from "./Kurs";
import { Pitanje } from "./Pitanje";


@Entity()
export class Kviz {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  naziv: string;

  @ManyToOne(() => Kurs)
  kurs: Kurs;

  @OneToMany(() => Pitanje, p => p.kviz, { eager: true })
  pitanja: Pitanje[]

}