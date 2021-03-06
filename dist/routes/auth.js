"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validate_1 = require("../middlewares/validate");
const authRouter = (0, express_1.Router)();
authRouter.post('/', [
    (0, express_validator_1.check)('email', 'Correo electronico requerido').notEmpty(),
    (0, express_validator_1.check)('email', 'No es un correo electronico valido').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').notEmpty(),
    validate_1.validate
], auth_1.login);
authRouter.post('/register', [
    (0, express_validator_1.check)('email', 'Correo electronico requerido').notEmpty(),
    (0, express_validator_1.check)('email', 'No es un correo electronico valido').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').notEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener mas de 8 caracteres').isLength({ min: 8 }),
    validate_1.validate
], auth_1.register);
exports.default = authRouter;
