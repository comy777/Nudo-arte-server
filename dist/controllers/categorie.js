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
exports.saveCategorie = exports.getCategories = void 0;
const Categorie_1 = __importDefault(require("../models/Categorie"));
const getCategories = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield Categorie_1.default.find();
    return resp.send({ categories });
});
exports.getCategories = getCategories;
const saveCategorie = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { categorie } = req.body;
    const validate = yield Categorie_1.default.findOne({ categorie });
    if (validate)
        return resp.send({ error: 'La categoria ya se encuentra registrada' });
    const categorieData = new Categorie_1.default({ categorie });
    yield categorieData.save();
    return resp.send({ categorie: categorieData });
});
exports.saveCategorie = saveCategorie;
