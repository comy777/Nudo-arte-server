import { Request, Response } from 'express';
import Categorie from '../models/Categorie';
import Product from '../models/Product';
import User from '../models/User';
import { getIdCloudinary, uploadImageCloudinary } from '../utils/upload';

export const getProducts = async (req: Request, resp: Response) => {
	const query = { state: true };
	const products = await Product.find(query);
	return resp.send({ products });
};

export const saveProduct = async (req: Request, resp: Response) => {
	const uid = req.user;
	const user = await User.findById(uid);
	if (!user) return resp.send({ error: 'Usuario no registrado' });
	const { categorie } = req.body;
	const validCategorie = await Categorie.findOne({ categorie });
	if (!validCategorie) return resp.send({ error: 'La categoria no existe' });
	const { product } = req.body;
	const validateProduct = await Product.findOne({ product });
	if (validateProduct) return resp.send({ error: 'El producto ya se encuentra registrado' });
	const productSave = new Product(req.body);
	productSave.user = user.id;
	productSave.categorie = validCategorie._id;
	try {
		await productSave.save();
		return resp.send({ product: productSave });
	} catch (error) {
		return resp.send({ error: 'Error del servidor' });
	}
};

export const updateProduct = async (req: Request, resp: Response) => {
	const uid = req.user;
	const { id } = req.params;
	const data = req.body;
	data.user = uid;
	const product = await Product.findById(id);
	if (!product) return resp.send({ error: 'Producto no registrado' });
	try {
		const productUpdate = await Product.findOneAndUpdate({ _id: id }, data, { new: true });
		return resp.send({ product: productUpdate });
	} catch (error) {
		return resp.send({ error: 'Error del servidor' });
	}
};

export const deleteProduct = async (req: Request, resp: Response) => {
	const uid = req.user;
	const { id } = req.params;
	const user = await User.findById(uid);
	if (!user) return resp.send({ error: 'Usuario no registrado' });
	const product = await Product.findById(id);
	if (!product) return resp.send({ error: 'Producto no registrado' });
	try {
		if (product.images.length > 0) {
			product.images.map(async (item) => {
				await getIdCloudinary(item.url);
			});
		}
		await Product.findOneAndUpdate({ _id: id }, { state: false }, { new: true });
		return resp.send({ msg: 'Producto eliminado' });
	} catch (error) {
		return resp.send({ error: 'Error del servidor' });
	}
};

export const uploadImage = async (req: Request, resp: Response) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return resp.send({ msg: 'No files were uploaded.' });
	}
	if (!req.files.image) {
		return resp.send({ msg: 'No hay imagenes para subir' });
	}
	const result = await uploadImageCloudinary(req.files.image);
	if (!result) return resp.send({ error: 'Error al subir la imagen' });
	return resp.send({ url: result.secure_url });
};
