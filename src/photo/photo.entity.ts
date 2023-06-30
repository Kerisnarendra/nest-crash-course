import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}