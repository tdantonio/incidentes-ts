import { myDataSource } from "./data-source"
import { Entidad, Establecimiento, Incidente, PrestacionDeServicio, Servicio } from "./entity/Incidente"
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

//Guardar en base de datos
//await AppDataSource.manager.save(user)

//traer de base de datos
//const users = await AppDataSource.manager.find(User)

//init (podriamos moverlo a otro archivo)
const banio = new Servicio
banio.nombre = "Baño"

const utn = new Entidad
utn.nombre = "UTN"
utn.localizacion = "Argentina"

const medrano = new Establecimiento
medrano.nombre = "Medrano"
medrano.servicios = [banio]
medrano.entidad = utn

const prestacionDeServicio: PrestacionDeServicio = new PrestacionDeServicio
prestacionDeServicio.entidad = utn
prestacionDeServicio.establecimiento = medrano
prestacionDeServicio.servicio = banio

const incidente: Incidente = new Incidente
incidente.titulo = "test"
incidente.descripcion = "test"
incidente.fechaHoraApertura = new Date
incidente.estado = false
incidente.prestacionDeServicio = prestacionDeServicio

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
    const incidente_post = await myDataSource.getRepository(Incidente).create(req.body) //creo que aca lo crea a partir de un json
    await myDataSource.manager.save(incidente_post);
    res.redirect('/incidentes');
})
app.post('/incidente_test', async (req: Request, res: Response) => {
    await myDataSource.manager.save(incidente)
    res.redirect('/incidentes');
})

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
