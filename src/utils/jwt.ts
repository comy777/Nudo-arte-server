import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserToken } from '../interfaces/interfaces';
import User from '../models/User';

export const generateToken = ({ uid, username }: UserToken) => {
	try {
		const payload = { uid, username };
		return jwt.sign(payload, process.env.SECRET_KEY, {
			expiresIn: '7d'
		});
	} catch (error) {
		console.log(error);
	}
};

export const validateToken = async (req: Request, resp: Response, next: Function) => {
	try {
		const token = req.headers['authorization'];
		if (!token) return resp.send({ error: 'Token requerido' });
		const validate: any = jwt.verify(token, process.env.SECRET_KEY);
		if (!validate) return resp.send({ error: 'Refresh token' });
		const { uid } = validate;
		const validateUser = await User.findById(uid);
		if (!validateUser) return resp.send({ error: 'El usuario no se encuentra registrado' });
		req.user = validateUser.id;
		next();
	} catch (error) {
		return resp.send({ error: 'Refresh token' });
	}
};
