import { Router } from 'express';
import { check } from 'express-validator';
import { login, register } from '../controllers/auth';
import { validate } from '../middlewares/validate';

const authRouter = Router();

authRouter.post(
	'/',
	[
		check('email', 'Correo electronico requerido').notEmpty(),
		check('email', 'No es un correo electronico valido').isEmail(),
		check('password', 'La contraseña es obligatoria').notEmpty(),
		validate
	],
	login
);

authRouter.post(
	'/register',
	[
		check('email', 'Correo electronico requerido').notEmpty(),
		check('email', 'No es un correo electronico valido').isEmail(),
		check('password', 'La contraseña es obligatoria').notEmpty(),
		check('password', 'La contraseña debe tener mas de 8 caracteres').isLength({ min: 8 }),
		validate
	],
	register
);

export default authRouter;
