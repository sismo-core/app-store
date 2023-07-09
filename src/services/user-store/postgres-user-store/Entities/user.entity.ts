import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("zk-telegram-bot")
@Unique(["userId", "appSlug"])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("character varying")
  userId: string;

  @Column("character varying")
  appSlug: string;
}
