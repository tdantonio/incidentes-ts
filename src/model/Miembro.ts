import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Comunidad } from "./Comunidad";
import { Usuario } from "./Usuario";

type Rol = "ADMINISTRADOR" | "MIEMBRO";

type RolTemporal = "AFECTADO" | "OBSERVADOR";

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
