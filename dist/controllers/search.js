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
exports.searchCategorie = exports.searchProduct = void 0;
const Categorie_1 = __importDefault(require("../models/Categorie"));
const Product_1 = __importDefault(require("../models/Product"));
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.params;
    const regex = new RegExp(search, 'i');
    const products = yield Product_1.default.find({
        product: regex,
        state: true
    }).populate('categorie', 'product');
    return res.send({
        results: products
    });
});
exports.searchProduct = searchProduct;
const searchCategorie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.params;
    const regex = new RegExp(search, 'i');
    const categorie = yield Categorie_1.default.find({
        categorie: regex
    });
    return res.send({
        results: categorie
    });
});
exports.searchCategorie = searchCategorie;
