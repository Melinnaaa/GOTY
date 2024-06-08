"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload.controller");
const router = (0, express_1.Router)();
router.post('/', upload_controller_1.uploadFiles, upload_controller_1.handleUpload);
exports.default = router;
