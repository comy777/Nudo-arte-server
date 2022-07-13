import { Response, Request } from 'express';
import Categorie from '../models/Categorie';
import Product from '../models/Product';

export const searchProduct = async (req: Request, res: Response) => {
	const { search } = req.params;
	const regex = new RegExp(search, 'i');
	const products = await Product.find({
		product: regex,
		state: true
	}).populate('categorie', 'product');
	return res.send({
		results: products
	});
};

export const searchCategorie = async (req: Request, res: Response) => {
	const { search } = req.params;
	const regex = new RegExp(search, 'i');
	const categorie = await Categorie.find({
		categorie: regex
	});
	return res.send({
		results: categorie
	});
};
