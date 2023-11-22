import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,
         JoinColumn, OneToMany, ManyToMany, JoinTable, OneToOne } from "typeorm"
import { Usuario } from "./Usuario";

@Entity({name: "servicio"})
export class Servicio {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: "nombre" })
    nombre: string;

}

@Entity({name: "entidad"})
export class Entidad {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: "nombre" })
    nombre: string;
  
    @Column({ type: "text" })
    localizacion: string;
  
}



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
        inverseJoinColumn: { name: "servicio_id" },
    })
    servicios: Servicio[];

    @ManyToOne(() => Entidad)
    @JoinColumn({ name: "entidad_id" })
    entidad: Entidad;
}


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



@Entity({name: "incidente"})
export class Incidente {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string

    @Column( {type: "timestamp"})
    fechaHoraApertura: Date

    @Column( {type: "timestamp", nullable: true})
    fechaHoraCierre: Date

    @Column({ type: "text" , nullable: true})
    descripcion: string;

    @Column({ type: "boolean"})
    estado: boolean;

    @ManyToOne(() => PrestacionDeServicio, {cascade: true})
    @JoinColumn({ name: "prestacion_id", referencedColumnName: "id"})
    prestacionDeServicio: PrestacionDeServicio;

    @OneToOne(() => Usuario, { cascade: true })
    @JoinColumn({ name: "usuarioApertura_id" })
    usuarioApertura: Usuario;
  
    @OneToOne(() => Usuario, { cascade: true, nullable: true})
    @JoinColumn({ name: "usuarioCierre_id" })
    usuarioCierre: Usuario | null;

    //TODO modelar los usuarios de apertura/cierre


/*  aperturaToString(): String {
        return `${this.usuarioApertura.getNombre()}: ${this.fechaHoraApertura.toISOString().split('T')[0]}`;
    }*/
}





