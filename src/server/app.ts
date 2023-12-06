import { myDataSource } from "./data-source"
import express, { Request, Response } from 'express';
import {Liquid} from 'liquidjs';
import { incidentesController } from '../controllers/incidentesController';

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

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
app.get('/usuarios/:id/incidentes', incidentesController);

app.listen(port, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
