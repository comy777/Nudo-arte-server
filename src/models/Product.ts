import { model, Schema } from 'mongoose';

const ProductSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId
		},
		product: {
			type: String,
			required: [ true, 'El nombre del producto es obligatorio' ],
			uppercase: true
		},
		price: {
			type: Number,
			required: [ true, 'El precio del producto es obligatorio' ]
		},
		amount: {
			type: Number,
			default: 0
		},
		state: {
			type: Boolean,
			default: true
		},
		images: {
			type: Array,
			url: String,
			default: []
		},
		categorie: {
			type: Schema.Types.ObjectId,
			required: [ true, 'La categoria del producto es requerida' ]
		}
	},
	{ timestamps: true }
);

ProductSchema.methods.toJSON = function() {
	const { __v, state, user, createdAt, updatedAt, ...data } = this.toObject();
	return data;
};

export default model('product', ProductSchema);
