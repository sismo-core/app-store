import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("zk-telegram-bot")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    userId: string

    @Column()
    appSlug: string
}