import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { GradoDeConfianza } from "./GradoDeConfianza";
import { Incidente } from "./Incidente";
import { Miembro } from "./Miembro";

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
