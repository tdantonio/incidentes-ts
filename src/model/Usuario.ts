import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { CredencialDeAcceso } from "./CredencialDeAcceso";
import { GradoDeConfianza } from "./GradoDeConfianza";


@Entity({ name: "usuario" })
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre" })
  nombre: string;

  @Column({ name: "apellido" })
  apellido: string;

  @OneToOne(() => CredencialDeAcceso, { cascade: true })
  @JoinColumn({ name: "credencialdeacceso_id" })
  credencialDeAcceso: CredencialDeAcceso;

  @Column({ name: "mail", nullable: true })
  mail: string;

  @Column({ name: "telefono", nullable: true })
  telefono: string;

  @Column({ name: "puntosdeconfianza"})
  puntosDeConfianza: number;

  @OneToOne(() => GradoDeConfianza, { cascade: true })
  @JoinColumn({ name: "grado_confianza_id" })
  gradoDeConfianza: GradoDeConfianza;

}
