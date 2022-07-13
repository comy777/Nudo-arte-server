import { Router } from 'express';
import { searchProduct, searchCategorie } from '../controllers/search';

const searchRouter = Router();

searchRouter.get('/product/:search', searchProduct);

searchRouter.get('/categorie/:search', searchCategorie);

export default searchRouter;
