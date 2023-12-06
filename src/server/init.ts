import { myDataSource } from "./data-source"
import { Comunidad } from "../model/Comunidad"
import { CredencialDeAcceso } from "../model/CredencialDeAcceso"
import { GradoDeConfianza } from "../model/GradoDeConfianza"
import { Miembro } from "../model/Miembro"
import { Usuario } from "../model/Usuario"
import { Entidad } from "../model/Entidad"
import { Establecimiento } from "../model/Establecimiento"
import { Incidente } from "../model/Incidente"
import { PrestacionDeServicio } from "../model/PrestacionDeServicio"
import { Servicio } from "../model/Servicio"

const confianzaNoConfiable = new GradoDeConfianza
confianzaNoConfiable.nombreGradoConfianza = "NO_CONFIABLE"

const confianzaConReservas = new GradoDeConfianza
confianzaConReservas.nombreGradoConfianza = "CON_RESERVAS"

const confianzaConfiableNivel1 = new GradoDeConfianza
confianzaConfiableNivel1.nombreGradoConfianza = "CONFIABLE_NIVEL_1"

const confianzaConfiableNivel2 = new GradoDeConfianza
confianzaConfiableNivel2.nombreGradoConfianza = "CONFIABLE_NIVEL_2"


const usuario = new Usuario
usuario.nombre = "Tomas"
usuario.apellido = "DAntonio"
usuario.mail = "tdantonio@frba.utn.edu.ar"

const credencial = new CredencialDeAcceso
credencial.nombreUsuario = "tdantonio"
credencial.contrasenia = "aguanteboca12"
credencial.fechaUltimoCambio = new Date

usuario.credencialDeAcceso = credencial
usuario.telefono = "1234567890"
usuario.gradoDeConfianza = confianzaConfiableNivel2
usuario.puntosDeConfianza = 6


const bosterosDesdeLaCuna = new Comunidad
bosterosDesdeLaCuna.nombre = "Bosteros desde la cuna"
bosterosDesdeLaCuna.gradoDeConfianza = confianzaConfiableNivel2
bosterosDesdeLaCuna.puntosDeConfianza = 6

const tomyBostero = new Miembro
tomyBostero.usuario = usuario
tomyBostero.rol = "ADMINISTRADOR"
tomyBostero.rolTemporal = "OBSERVADOR"
tomyBostero.comunidad = bosterosDesdeLaCuna

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


const incidente_prueba: Incidente = new Incidente
incidente_prueba.titulo = "test"
incidente_prueba.descripcion = "test"
incidente_prueba.fechaHoraApertura = new Date
incidente_prueba.estado = false
incidente_prueba.prestacionDeServicio = prestacionDeServicio
incidente_prueba.usuarioApertura = usuario

bosterosDesdeLaCuna.incidentes = []
bosterosDesdeLaCuna.miembros = []

bosterosDesdeLaCuna.agregarIncidentes(incidente_prueba)
bosterosDesdeLaCuna.agregarMiembros(tomyBostero)


async function init() {
    //Guardar en base de datos
    //await AppDataSource.manager.save(user)
    await myDataSource.manager.save(usuario)
    await myDataSource.manager.save(bosterosDesdeLaCuna)
}

myDataSource
.initialize()
.then(() => {
    console.log("Data Source has been initialized!")
    init()
    .then(() => {
      console.log('Variables inicializadas y guardadas en la base de datos.');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
})
