import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Kviz } from "./Kviz";

@Entity()
export class Kurs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  naziv: string;

  @Column({
    type: "text",
  })
  opis: string;

  @OneToMany(() => Kviz, (k) => k.kurs, { eager: true })
  kvizovi: Kviz[];
}
