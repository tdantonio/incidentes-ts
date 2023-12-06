import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { Entidad } from "./Entidad";
import { Servicio } from "./Servicio";

@Entity({name: "establecimiento"})
export class Establecimiento {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: "nombre" })
    nombre: string;

    @ManyToMany(() => Servicio, { cascade: true })
    @JoinTable({
        name: "establecimiento_servicio",
        joinColumn: { name: "establecimiento_id" },
        inverseJoinColumn: { name: "servicios_id" },
    })
    servicios: Servicio[];

    @ManyToOne(() => Entidad)
    @JoinColumn({ name: "entidad_id" })
    entidad: Entidad;
}