"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const express_validator_1 = require("express-validator");
const jwt_1 = require("../utils/jwt");
const validate_1 = require("../middlewares/validate");
const productRouter = (0, express_1.Router)();
productRouter.get('/', product_1.getProducts);
productRouter.post('/', [
    jwt_1.validateToken,
    (0, express_validator_1.check)('product', 'El nombre del producto es obligatorio').notEmpty(),
    (0, express_validator_1.check)('price', 'El precio del producto es obligatorio').notEmpty(),
    (0, express_validator_1.check)('categorie', 'La categoria del producto es obligatoria').notEmpty(),
    validate_1.validate
], product_1.saveProduct);
productRouter.put('/:id', [
    jwt_1.validateToken,
    (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(),
    (0, express_validator_1.check)('product', 'El nombre del producto es obligatorio').notEmpty(),
    (0, express_validator_1.check)('price', 'El precio del producto es obligatorio').notEmpty(),
    validate_1.validate
], product_1.updateProduct);
productRouter.post('/upload', [jwt_1.validateToken], product_1.uploadImage);
productRouter.delete('/:id', [jwt_1.validateToken, (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(), validate_1.validate], product_1.deleteProduct);
exports.default = productRouter;
