"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_1 = require("../controllers/search");
const searchRouter = (0, express_1.Router)();
searchRouter.get('/product/:search', search_1.searchProduct);
searchRouter.get('/categorie/:search', search_1.searchCategorie);
exports.default = searchRouter;
