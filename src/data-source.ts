import "reflect-metadata"
import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "postgres",
    host: "dpg-ckve5vramefc73ftt8pg-a.oregon-postgres.render.com",
    port: 5432,
    username: "root",
    password: "HGwbCa6qmJNjkN7JdC4dcWqZtrIiTUDJ",
    database: "deploydb_jx33",
    synchronize: true,
    logging: false,
    entities: ["build/entity/*.js"],
    ssl: {
        // Configura la ruta del certificado SSL si es necesario

        // Habilita la compatibilidad con TLS 1.2
        minVersion: "TLSv1.2",
        // Configura las suites de cifrado compatibles
        ciphers: "TLS_AES_128_GCM_SHA256",
    },
    migrations: [],
    subscribers: [],
})
