import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: "servicio"})
export class Servicio {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: "nombre" })
    nombre: string;

}