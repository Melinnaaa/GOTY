import { Router } from 'express';
import { createSolicitud, getSolicitudesByUser, responderSolicitud, getSolicitudesNoRespondidas, descargarArchivo} from '../controllers/solicitud.controller';
import { verifySession } from '../middlewares/session.middleware';
import { verifyRole } from '../middlewares/role.middleware';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', verifySession, verifyToken, createSolicitud);

router.get('/user/:rut', verifySession, verifyToken, getSolicitudesByUser);

router.post('/responder/:id', verifySession, verifyToken, verifyRole(1), responderSolicitud);

router.get('/no-respondidas', verifySession, verifyToken, verifyRole(1), getSolicitudesNoRespondidas);

router.get('/descargar/:id', verifySession, verifyToken, verifyRole(1), descargarArchivo);

export default router;