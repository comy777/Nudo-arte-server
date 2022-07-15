"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    product: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        uppercase: true
    },
    price: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio']
    },
    amount: {
        type: Number,
        default: 0
    },
    description: {
        type: String
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
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'La categoria del producto es requerida']
    }
}, { timestamps: true });
ProductSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, state, user, createdAt, updatedAt } = _a, data = __rest(_a, ["__v", "state", "user", "createdAt", "updatedAt"]);
    return data;
};
exports.default = (0, mongoose_1.model)('product', ProductSchema);
