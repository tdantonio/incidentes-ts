import "reflect-metadata"
import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "postgres",
    host: "dpg-clevdgsp3ifc73elp3qg-a.ohio-postgres.render.com",
    port: 5432,
    username: "root",
    password: "XSIj2WIU11F9PGw6MsJGB6ABJTYD306D",
    database: "test_8j2p",
    synchronize: true,
    logging: true,
    entities: ["build/model/*.js"],
    ssl: {
        minVersion: "TLSv1.2",
        ciphers: "TLS_AES_128_GCM_SHA256",
    },
    migrations: [],
    subscribers: [],
})
