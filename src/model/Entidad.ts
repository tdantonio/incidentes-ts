import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: "entidad"})
export class Entidad {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: "nombre" })
    nombre: string;
  
    @Column({ type: "text" })
    localizacion: string;
  
}