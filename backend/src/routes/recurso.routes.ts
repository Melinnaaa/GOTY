import { Router } from 'express';
import { reservarRecurso, obtenerRecursosDisponibles, obtenerRecursosNoDisponibles, liberarRecursoManualmente, obtenerReservasPorEmpleado } from '../controllers/recurso.controller';
import { verifySession } from '../middlewares/session.middleware';
import { verifyToken } from '../middlewares/auth.middleware';
import { verifyRole } from '../middlewares/role.middleware';

const router = Router();

router.post('/reservar/:idRecurso', verifyToken, verifySession, reservarRecurso);
router.get('/disponibles', verifyToken, verifySession, obtenerRecursosDisponibles);
router.get('/noDisponibles', verifyToken, verifySession, verifyRole(1), obtenerRecursosNoDisponibles);
router.put('/liberar/:idRecurso',  verifyToken, verifySession, verifyRole(1), liberarRecursoManualmente);
router.get('/reservas/:rut', verifyToken, verifySession, obtenerReservasPorEmpleado);



export default router;
