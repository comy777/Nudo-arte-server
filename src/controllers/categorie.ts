import { Request, Response } from 'express';
import Categorie from '../models/Categorie';

export const getCategories = async (req: Request, resp: Response) => {
	const categories = await Categorie.find();
	return resp.send({ categories });
};

export const saveCategorie = async (req: Request, resp: Response) => {
	const { categorie } = req.body;
	const validate = await Categorie.findOne({ categorie });
	if (validate) return resp.send({ error: 'La categoria ya se encuentra registrada' });
	const categorieData = new Categorie({ categorie });
	await categorieData.save();
	return resp.send({ categorie: categorieData });
};
