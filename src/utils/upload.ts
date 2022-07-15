import cloudinary from 'cloudinary';

export const uploadImageCloudinary = async (image: any) => {
	try {
		const extensionsValid = [ 'png', 'jpg', 'jpeg' ];
		const { name, tempFilePath } = image;
		const nameExtension = name.split('.');
		const extension = nameExtension[nameExtension.length - 1];
		if (!extensionsValid.includes(extension)) return;
		cloudinary.v2.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET
		});
		return await cloudinary.v2.uploader.upload(tempFilePath, {
			upload_preset: process.env.UPLOAD_PRESET
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteImage = async (id: string) => {
	const public_id = id.trim();
	try {
		cloudinary.v2.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET
		});
		await cloudinary.v2.uploader.destroy(`Nudo Arte/${public_id}`);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const getIdCloudinary = async (image: string) => {
	const name = image.split('/');
	if (name[0] === 'https:') {
		const [ id ] = name[name.length - 1].split('.');
		await deleteImage(id);
	}
};
