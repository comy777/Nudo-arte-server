import { Router } from 'express';
import { getProducts, saveProduct, updateProduct, uploadImage, deleteProduct } from '../controllers/product';
import { check } from 'express-validator';
import { validateToken } from '../utils/jwt';
import { validate } from '../middlewares/validate';

const productRouter = Router();

productRouter.get('/', getProducts);

productRouter.post(
	'/',
	[
		validateToken,
		check('product', 'El nombre del producto es obligatorio').notEmpty(),
		check('price', 'El precio del producto es obligatorio').notEmpty(),
		check('categorie', 'La categoria del producto es obligatoria').notEmpty(),
		validate
	],
	saveProduct
);

productRouter.put(
	'/:id',
	[
		validateToken,
		check('id', 'No es un id valido').isMongoId(),
		check('product', 'El nombre del producto es obligatorio').notEmpty(),
		check('price', 'El precio del producto es obligatorio').notEmpty(),
		validate
	],
	updateProduct
);

productRouter.post('/upload', [ validateToken ], uploadImage);

productRouter.delete('/:id', [ validateToken, check('id', 'No es un id valido').isMongoId(), validate ], deleteProduct);

export default productRouter;
