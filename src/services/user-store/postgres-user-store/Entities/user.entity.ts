import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("zk-telegram-bot")
@Unique(["userId", "appSlug"])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  userId: string;

  @Column("text")
  appSlug: string;
}
