namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: string;
		PORT: number;
		MONGO_URI: string;
		SECRET_KEY: string;
		CLOUDINARY_URL: string;
		UPLOAD_PRESET: string;
		CLUOD_NAME: string;
		API_KEY: string;
		API_SECRET: string;
	}
}

namespace Express {
	interface Request {
		user: string;
	}
}
