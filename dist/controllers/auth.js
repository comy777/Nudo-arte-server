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
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user)
        return res.send({ error: 'El usuario no se encuentra registrado' });
    const validPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!validPassword)
        return res.send({ error: 'El correo y la contraseña no coinciden' });
    //Token
    const { username, id: uid } = user;
    const token = (0, jwt_1.generateToken)({ uid, username });
    return res.send({ token });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (user)
        return res.send({ error: 'El usuario ya se encuentra registrado' });
    const salt = yield bcryptjs_1.default.genSaltSync();
    const userData = new User_1.default(req.body);
    userData.password = bcryptjs_1.default.hashSync(password, salt);
    userData.save();
    //Token
    const { username, id: uid } = userData;
    const token = (0, jwt_1.generateToken)({ uid, username });
    return res.send({ token });
});
exports.register = register;
