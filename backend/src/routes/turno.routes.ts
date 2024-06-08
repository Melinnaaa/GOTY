import { Router } from 'express';
import { generarHorario, obtenerHorarios, actualizarTurnos, obtenerTurnosPorFecha,  obtenerTodosLosEmpleados} from '../controllers/turno.controller';

const router = Router();

router.post('/generar', generarHorario);
router.get('/obtener', obtenerHorarios);
router.put('/actualizar/:fecha', actualizarTurnos);
router.get('/obtenerPorFecha/:fecha', obtenerTurnosPorFecha);
router.get('/obtenerEmpleados', obtenerTodosLosEmpleados);

export default router;
