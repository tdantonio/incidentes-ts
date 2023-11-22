import "reflect-metadata"
import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "postgres",
    host: "dpg-cl78ksn6e7vc739qd670-a.oregon-postgres.render.com",
    port: 5432,
    username: "root",
    password: "5MQSwqdda3hjuouOBSvbAZVG1JiAYZEQ",
    database: "tpa_pmr_g14_zdga",
    synchronize: false,
    logging: true,
    entities: ["build/model/*.js"],
    ssl: {
        minVersion: "TLSv1.2",
        ciphers: "TLS_AES_128_GCM_SHA256",
    },
    migrations: [],
    subscribers: [],
})
