import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    userid!: number
    @Column()
    status!: boolean
    @Column()
    total!: number
    @Column()
    notas!: string
}
