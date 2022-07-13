"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categorie_1 = require("../controllers/categorie");
const jwt_1 = require("../utils/jwt");
const express_validator_1 = require("express-validator");
const validate_1 = require("../middlewares/validate");
const categorieRouter = (0, express_1.Router)();
categorieRouter.get('', categorie_1.getCategories);
categorieRouter.post('', [jwt_1.validateToken, (0, express_validator_1.check)('categorie', 'Debe tener una categoria').notEmpty(), validate_1.validate], categorie_1.saveCategorie);
exports.default = categorieRouter;