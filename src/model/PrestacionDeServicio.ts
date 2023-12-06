import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Entidad } from "./Entidad";
import { Establecimiento } from "./Establecimiento";
import { Servicio } from "./Servicio";

@Entity({name: "prestacion"})
export class PrestacionDeServicio {
    
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Entidad, {cascade: true})
    @JoinColumn({ name: "entidad_id", referencedColumnName: "id"})
    entidad: Entidad;

    @ManyToOne(() => Establecimiento, {cascade: true})
    @JoinColumn({ name: "establecimiento_id", referencedColumnName: "id" })
    establecimiento: Establecimiento;
  
    @ManyToOne(() => Servicio, {cascade: true})
    @JoinColumn({ name: "servicio_id", referencedColumnName: "id" })
    servicio: Servicio;
}
