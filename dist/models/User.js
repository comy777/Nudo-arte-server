"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'El correo electronico es requerido']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'La contraseña es requerida']
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
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('user', UserSchema);
