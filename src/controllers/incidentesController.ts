import { Request, Response } from 'express';
import { myDataSource } from '../server/data-source';
import { Comunidad } from '../model/Comunidad';

export const incidentesController = async (req: Request, res: Response) => {
  const usuario_id = parseInt(req.params.id, 10);

  try {
    const comunidadesRepository = myDataSource.getRepository(Comunidad);

    const comunidades = await comunidadesRepository
        .createQueryBuilder('c')
        .innerJoinAndSelect('c.miembros', 'm')
        .leftJoinAndSelect('c.incidentes', 'i')
        .leftJoinAndSelect('i.prestacionDeServicio', 'p')
        .leftJoinAndSelect('p.entidad', 'en')
        .leftJoinAndSelect('p.establecimiento', 'es')
        .leftJoinAndSelect('p.servicio', 's')
        .leftJoinAndSelect('i.usuarioApertura', 'u1')
        .leftJoinAndSelect('i.usuarioCierre', 'u2')
        .where('m.usuario.id = :usuario_id', { usuario_id })
        .getMany();

    if (comunidades.length == 0) {
      return res.status(404).send('El usuario ingresado no pertenece a ninguna comunidad');
    }

    res.render('incidentes', { comunidades });
  } catch (error) {
    console.error('Error al buscar usuario y miembros:', error);
    res.status(500).send('Error interno del servidor');
  }
};
