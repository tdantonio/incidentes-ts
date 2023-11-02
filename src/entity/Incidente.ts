import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,
         JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"

export class Servicio {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: "nombre" })
    nombre: string;
  
    @Column({ name: "estado", type: "boolean" })
    estado: boolean;
}

export class Establecimiento {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: "nombre" })
    nombre: string;

    @ManyToMany(() => Servicio, { cascade: true })
    @JoinTable()
    servicios: Servicio[];
}

export class Entidad {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: "nombre" })
    nombre: string;
  
    @Column({ type: "text" })
    localizacion: string;
  
//    @OneToMany(() => Establecimiento, (establecimiento) => establecimiento.entidad, { cascade: true })
//    listaEstablecimientos: Establecimiento[];
}

@Entity()
export class PrestacionDeServicio {
    @ManyToOne(() => Entidad)
    @JoinColumn({ name: "entidad_id" })
    entidad: Entidad;

    @ManyToOne(() => Establecimiento)
    @JoinColumn({ name: "establecimiento_id" })
    establecimiento: Establecimiento;
  
    @ManyToOne(() => Servicio)
    @JoinColumn({ name: "servicio_id" })
    servicio: Servicio;
}

@Entity()
export class Incidente {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string

    @Column( {type: "timestamp"})
    fechaHoraApertura: Date

    @Column( {type: "timestamp"})
    fechaHoraCierre: Date

    @Column({ type: "text" })
    descripcion: string;

    @Column({ type: "boolean" })
    estado: boolean;

    @ManyToOne(() => PrestacionDeServicio, { cascade: true })
    @JoinColumn({ name: "prestacionDeServicio_id" })
    prestacionDeServicio: PrestacionDeServicio;
}





