import { Router } from 'express';
import { getCategories, saveCategorie } from '../controllers/categorie';
import { validateToken } from '../utils/jwt';
import { check } from 'express-validator';
import { validate } from '../middlewares/validate';

const categorieRouter = Router();

categorieRouter.get('', getCategories);

categorieRouter.post(
	'',
	[ validateToken, check('categorie', 'Debe tener una categoria').notEmpty(), validate ],
	saveCategorie
);

export default categorieRouter;
