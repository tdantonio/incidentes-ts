import { myDataSource } from "./data-source"
import { Entidad, Establecimiento, Incidente, PrestacionDeServicio, Servicio } from "../model/Incidente"
import express, { Request, Response } from 'express';
import {Liquid} from 'liquidjs';

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
app.get('/incidentes', async function (req: Request, res: Response) {
    const incidentes = await myDataSource.getRepository(Incidente).find()
    res.render('incidentes', { incidentes }); //TODO ver bien en el liquid como obtener nombre de la entidad a partir del incidente por ejemplo
    // se podria hacer una funcion nombreEntidad() en incidente que haga this.entidad.nombre o algo asi (no se como funca en este lenguaje)
});
app.post('/incidentes', async (req: Request, res: Response) => {
    const incidente_post = myDataSource.getRepository(Incidente).create(req.body) //creo que aca lo crea a partir de un json
    //creo que aca lo crea a partir de un json
    await myDataSource.manager.save(incidente_post);
    res.redirect('/incidentes');
})

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
