"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.deleteProduct = exports.updateProduct = exports.saveProduct = exports.getProducts = void 0;
const Categorie_1 = __importDefault(require("../models/Categorie"));
const Product_1 = __importDefault(require("../models/Product"));
const User_1 = __importDefault(require("../models/User"));
const upload_1 = require("../utils/upload");
const getProducts = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { state: true };
    const products = yield Product_1.default.find(query);
    return resp.send({ products });
});
exports.getProducts = getProducts;
const saveProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.user;
    const user = yield User_1.default.findById(uid);
    if (!user)
        return resp.send({ error: 'Usuario no registrado' });
    const { categorie } = req.body;
    const validCategorie = yield Categorie_1.default.findOne({ categorie });
    if (!validCategorie)
        return resp.send({ error: 'La categoria no existe' });
    const product = new Product_1.default(req.body);
    product.user = user.id;
    product.categorie = validCategorie._id;
    try {
        yield product.save();
        return resp.send({ product });
    }
    catch (error) {
        return resp.send({ error: 'Error del servidor' });
    }
});
exports.saveProduct = saveProduct;
const updateProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.user;
    const { id } = req.params;
    const data = req.body;
    data.user = uid;
    const product = yield Product_1.default.findById(id);
    if (!product)
        return resp.send({ error: 'Producto no registrado' });
    try {
        const productUpdate = yield Product_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
        return resp.send({ product: productUpdate });
    }
    catch (error) {
        return resp.send({ error: 'Error del servidor' });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.user;
    const { id } = req.params;
    const user = yield User_1.default.findById(uid);
    if (!user)
        return resp.send({ error: 'Usuario no registrado' });
    const product = yield Product_1.default.findById(id);
    if (!product)
        return resp.send({ error: 'Producto no registrado' });
    try {
        if (product.images.length > 0) {
            product.images.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, upload_1.getIdCloudinary)(item.url);
            }));
        }
        yield Product_1.default.findOneAndUpdate({ _id: id }, { state: false }, { new: true });
        return resp.send({ msg: 'Producto eliminado' });
    }
    catch (error) {
        return resp.send({ error: 'Error del servidor' });
    }
});
exports.deleteProduct = deleteProduct;
const uploadImage = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.send({ msg: 'No files were uploaded.' });
    }
    if (!req.files.image) {
        return resp.send({ msg: 'No hay imagenes para subir' });
    }
    const result = yield (0, upload_1.uploadImageCloudinary)(req.files.image);
    if (!result)
        return resp.send({ error: 'Error al subir la imagen' });
    return resp.send({ url: result.secure_url });
});
exports.uploadImage = uploadImage;
