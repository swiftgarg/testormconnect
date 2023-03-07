import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Tax {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    income: number

    @Column("decimal", { precision: 10, scale: 2 })
    taxAmount: number

    @Column()
    name: string

}
