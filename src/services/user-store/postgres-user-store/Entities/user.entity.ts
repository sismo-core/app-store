import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity("zk-telegram-bot")
@Unique(["userId", "appSlug"])
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: string

    @Column()
    appSlug: string
}