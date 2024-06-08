import { Router } from 'express';
import { verifySession } from '../middlewares/session.middleware';
import { verifyRole } from '../middlewares/role.middleware';
import { 
  getEmpleados, 
  getUserById, 
  createEmpleado, 
  updateUser, 
  deleteEmpleado,
  crearAdministrador
} from '../controllers/admin.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Rutas para gestionar empleados
router.get('/', verifySession, verifyToken, verifyRole(1), getEmpleados);
router.get('/:id', verifySession, verifyToken, getUserById);
router.post('/', verifySession, verifyToken, verifyRole(1), createEmpleado);
router.put('/:id', verifySession, verifyToken, updateUser);
router.delete('/:id', verifySession, verifyToken, verifyRole(1), deleteEmpleado);
router.post('/crear-admin', verifySession, verifyToken, verifyRole(1), crearAdministrador);

export default router;
