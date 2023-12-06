import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,
         JoinColumn, OneToOne } from "typeorm"
import { Usuario } from "./Usuario";
import { PrestacionDeServicio } from "./PrestacionDeServicio";


@Entity({name: "incidente"})
export class Incidente {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string

    @Column( {name: "fechahoraapertura",type: "timestamp"})
    fechaHoraApertura: Date

    @Column( {name: "fechahoracierre", type: "timestamp", nullable: true})
    fechaHoraCierre: Date

    @Column({ type: "text" , nullable: true})
    descripcion: string;

    @Column({ type: "boolean"})
    estado: boolean;

    @ManyToOne(() => PrestacionDeServicio, {cascade: true})
    @JoinColumn({ name: "prestacion_id", referencedColumnName: "id"})
    prestacionDeServicio: PrestacionDeServicio;

    @OneToOne(() => Usuario, { cascade: true })
    @JoinColumn({ name: "usuarioapertura_id" })
    usuarioApertura: Usuario;
  
    @OneToOne(() => Usuario, { cascade: true, nullable: true})
    @JoinColumn({ name: "usuariocierre_id" })
    usuarioCierre: Usuario | null;

}





