import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type NombreGradoConfianza =
  | "NO_CONFIABLE"
  | "CON_RESERVAS"
  | "CONFIABLE_NIVEL_1"
  | "CONFIABLE_NIVEL_2";


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