import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { Incidente } from "./Incidente";


// Define un tipo literal que enumere los posibles valores
type NombreGradoConfianza =
  | "NO_CONFIABLE"
  | "CON_RESERVAS"
  | "CONFIABLE_NIVEL_1"
  | "CONFIABLE_NIVEL_2";

// Función de transformación para convertir el tipo literal en una cadena
function transformNombreGradoConfianza(value: NombreGradoConfianza): string {
  return value;
}



@Entity({ name: "grado_de_confianza" })
export class GradoDeConfianza {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: ["NO_CONFIABLE", "CON_RESERVAS", "CONFIABLE_NIVEL_1", "CONFIABLE_NIVEL_2"],
    transformer: {
      to: (value: NombreGradoConfianza) => value,
      from: (value: string) => value as NombreGradoConfianza,
    },
  })
  nombreGradoConfianza: NombreGradoConfianza;
}



@Entity({ name: "credencial" })
export class CredencialDeAcceso {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombreusuario" })
  nombreUsuario: string;

  @Column({ name: "contrasenia" })
  contrasenia: string;

  @Column({ name: "fechaultimocambio", type: "timestamp" })
  fechaUltimoCambio: Date;
}



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


type Rol = "ADMINISTRADOR" | "MIEMBRO";

type RolTemporal = "AFECTADO" | "OBSERVADOR";



@Entity({ name: "comunidad" })
export class Comunidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(() => Incidente, { cascade: true, eager: true })
  @JoinTable({
    name: "comunidad_incidente",
    joinColumn: {name: "comunidad_id"},
    inverseJoinColumn: {name: "incidentes_id"}
  })
  incidentes: Incidente[] ;

  @Column({name: "puntosdeconfianza"})
  puntosDeConfianza: number;

  @OneToOne(() => GradoDeConfianza, { cascade: true })
  @JoinColumn({ name: "grado_confianza_id" })
  gradoDeConfianza: GradoDeConfianza;

  @OneToMany(() => Miembro, (miembro) => miembro.comunidad, { cascade: true })
  miembros: Miembro[] ;

  agregarIncidete(incidente: Incidente): void {
      this.incidentes.push(incidente)
  }
  
  public agregarMiembros(...miembros: Miembro[]): void {
    this.miembros.push(...miembros);
  }

  public agregarIncidentes(...incidentes: Incidente[]): void {
    this.incidentes.push(...incidentes);
  }
}




@Entity({ name: "miembro" })
export class Miembro {

@PrimaryGeneratedColumn()
id: number;

@ManyToOne(() => Usuario)
@JoinColumn({ name: "usuario_id" })
usuario: Usuario;

@Column({
  type: "enum",
  enum: ["ADMINISTRADOR", "MIEMBRO"],
  transformer: {
    to: (value: Rol) => value,
    from: (value: string) => value as Rol,
  },
})
rol: Rol;

@Column({
  type: "enum",
  enum: ["AFECTADO", "OBSERVADOR"],
  transformer: {
    to: (value: RolTemporal) => value,
    from: (value: string) => value as RolTemporal,
  },
  name: "roltemporal"
})
rolTemporal: RolTemporal;

@ManyToOne(() => Comunidad)
@JoinColumn({ name: "comunidad_id" })
comunidad: Comunidad;
}

  