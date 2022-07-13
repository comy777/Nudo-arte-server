import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
	{
		username: {
			type: String
		},
		email: {
			type: String,
			unique: true,
			trim: true,
			required: [ true, 'El correo electronico es requerido' ]
		},
		password: {
			type: String,
			trim: true,
			required: [ true, 'La contraseña es requerida' ]
		},
		state: {
			type: Boolean,
			default: true
		},
		image: {
			type: {
				url: String
			}
		}
	},
	{ timestamps: true }
);

export default model('user', UserSchema);
