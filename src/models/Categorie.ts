import { Schema, model } from 'mongoose';

const CategorieSchema = new Schema({
	categorie: {
		type: String,
		required: [ true, 'El nombre de la categoria es requerido' ],
		uppercase: true
	}
});

CategorieSchema.methods.toJSON = function() {
	const { __v, ...data } = this.toObject();
	return data;
};

export default model('categorie', CategorieSchema);
