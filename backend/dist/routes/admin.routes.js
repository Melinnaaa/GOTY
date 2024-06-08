"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_middleware_1 = require("../middlewares/session.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Rutas para gestionar empleados
router.get('/', session_middleware_1.verifySession, auth_middleware_1.verifyToken, (0, role_middleware_1.verifyRole)(1), admin_controller_1.getEmpleados);
router.get('/:id', session_middleware_1.verifySession, auth_middleware_1.verifyToken, (0, role_middleware_1.verifyRole)(1), admin_controller_1.getEmpleadoById);
router.post('/', session_middleware_1.verifySession, auth_middleware_1.verifyToken, (0, role_middleware_1.verifyRole)(1), admin_controller_1.createEmpleado);
router.put('/:id', session_middleware_1.verifySession, auth_middleware_1.verifyToken, (0, role_middleware_1.verifyRole)(1), admin_controller_1.updateEmpleado);
router.delete('/:id', session_middleware_1.verifySession, auth_middleware_1.verifyToken, (0, role_middleware_1.verifyRole)(1), admin_controller_1.deleteEmpleado);
router.post('/crear-admin', session_middleware_1.verifySession, auth_middleware_1.verifyToken, (0, role_middleware_1.verifyRole)(1), admin_controller_1.crearAdministrador);
exports.default = router;
