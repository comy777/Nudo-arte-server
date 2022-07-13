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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("../routes/auth"));
const config_1 = require("../database/config");
const product_1 = __importDefault(require("../routes/product"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const categorie_1 = __importDefault(require("../routes/categorie"));
const search_1 = __importDefault(require("../routes/search"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.path = {
            auth: '/auth',
            product: '/product',
            categories: '/categories',
            search: '/search'
        };
        this.middlewares();
        this.routes();
        this.db();
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server port: ${this.port}`);
        });
    }
    routes() {
        this.app.use(this.path.auth, auth_1.default);
        this.app.use(this.path.product, product_1.default);
        this.app.use(this.path.categories, categorie_1.default);
        this.app.use(this.path.search, search_1.default);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.publicFolder();
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    db() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.connectDatabase)();
        });
    }
    publicFolder() {
        const publicPath = path_1.default.resolve(__dirname, '../public');
        this.app.use(express_1.default.static(publicPath));
    }
}
exports.default = Server;
