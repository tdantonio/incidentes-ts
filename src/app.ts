import { AppDataSource } from "./data-source"
import { Incidente } from "./entity/Incidente"
import express, { Request, Response } from 'express';
import {Liquid} from 'liquidjs';

//AppDataSource.initialize().then(async () => {

    //Guardar en base de datos
    //await AppDataSource.manager.save(user)

    //traer de base de datos
    //const users = await AppDataSource.manager.find(User)

    const incidents = [
        { id: 1, titulo: 'Incidente 1' },
        { id: 2, titulo: 'Incidente 2' },
        { id: 3, titulo: 'Incidente 3' },
    ];

    // Config Express
    const app = express();
    const port = 8080;
    app.use('/', express.static('resources/public'));


    // Config LiquidJS
    const engine = new Liquid();
    app.engine('liquid', engine.express());
    app.set('views', './resources/views');
    app.set('view engine', 'liquid');

    // Rutas
    app.get('/', (req: Request, res: Response) => {
        res.render('index');
    });
    app.get('/incidentes', (req: Request, res: Response) => {
        res.render('incidentes', { incidents });
    });

    // Iniciar el servidor
    app.listen(port, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
    });

//}).catch(error => console.log(error))
