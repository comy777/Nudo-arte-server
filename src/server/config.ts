import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import authRouter from '../routes/auth';
import { connectDatabase } from '../database/config';
import productRouter from '../routes/product';
import fileUpload from 'express-fileupload';
import categorieRouter from '../routes/categorie';
import searchRouter from '../routes/search';

class Server {
	public port: number;
	public app: Express;
	public path: {
		auth: string;
		product: string;
		categories: string;
		search: string;
	};
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.path = {
			auth: '/auth',
			product: '/product',
			categories: '/categories',
			search: '/search'
		};
		this.middlewares();
		this.routes();
		this.db();
	}

	start() {
		this.app.listen(this.port, () => {
			console.log(`Server port: ${this.port}`);
		});
	}

	routes() {
		this.app.use(this.path.auth, authRouter);
		this.app.use(this.path.product, productRouter);
		this.app.use(this.path.categories, categorieRouter);
		this.app.use(this.path.search, searchRouter);
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.publicFolder();
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: '/tmp/',
				createParentPath: true
			})
		);
	}

	async db() {
		await connectDatabase();
	}

	private publicFolder() {
		const publicPath = path.resolve(__dirname, '../public');
		this.app.use(express.static(publicPath));
	}
}

export default Server;
