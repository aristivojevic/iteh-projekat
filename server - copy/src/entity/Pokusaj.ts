import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Kviz } from "./Kviz";
import { User } from "./User";

@Entity()
export class Pokusaj {

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  kvizId: number;

  @Column()
  brojPoena: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Kviz)
  @JoinColumn({ name: 'kvizId' })
  kviz: Kviz;
}