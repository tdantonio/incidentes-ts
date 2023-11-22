import { Request, Response } from 'express';
import { myDataSource } from '../server/data-source';
import { Usuario } from '../model/Usuario';

export const incidentesController = async (req: Request, res: Response) => {
  const usuario_id = parseInt(req.params.id, 10);

  try {
    const usuarioRepository = myDataSource.getRepository(Usuario);
    const usuario = await usuarioRepository.findOneBy({id: usuario_id});

    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }

    const comunidades = usuario.miembros.map(m => m.comunidad) || [];

    res.render('incidentes', { usuario, comunidades });
  } catch (error) {
    console.error('Error al buscar usuario y miembros:', error);
    res.status(500).send('Error interno del servidor');
  }
};
