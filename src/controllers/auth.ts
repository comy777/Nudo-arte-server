import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { generateToken } from '../utils/jwt';

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) return res.send({ error: 'El usuario no se encuentra registrado' });
	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) return res.send({ error: 'El correo y la contraseña no coinciden' });
	//Token
	const { username, id: uid } = user;
	const token = generateToken({ uid, username });
	return res.send({ token });
};

export const register = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) return res.send({ error: 'El usuario ya se encuentra registrado' });
	const salt = await bcrypt.genSaltSync();
	const userData = new User(req.body);
	userData.password = bcrypt.hashSync(password, salt);
	userData.save();
	//Token
	const { username, id: uid } = userData;
	const token = generateToken({ uid, username });
	return res.send({ token });
};
