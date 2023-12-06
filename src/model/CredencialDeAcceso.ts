import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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