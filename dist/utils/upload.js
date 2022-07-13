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
exports.getIdCloudinary = exports.deleteImage = exports.uploadImageCloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLUOD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const uploadImageCloudinary = (image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const extensionsValid = ['png', 'jpg', 'jpeg'];
        const { name, tempFilePath } = image;
        const nameExtension = name.split('.');
        const extension = nameExtension[nameExtension.length - 1];
        if (!extensionsValid.includes(extension))
            return;
        return yield cloudinary_1.default.v2.uploader.upload(tempFilePath, {
            upload_preset: process.env.UPLOAD_PRESET
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.uploadImageCloudinary = uploadImageCloudinary;
const deleteImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const public_id = id.trim();
    try {
        yield cloudinary_1.default.v2.uploader.destroy(`Nudo Arte/${public_id}`);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.deleteImage = deleteImage;
const getIdCloudinary = (image) => __awaiter(void 0, void 0, void 0, function* () {
    const name = image.split('/');
    if (name[0] === 'https:') {
        const [id] = name[name.length - 1].split('.');
        yield (0, exports.deleteImage)(id);
    }
});
exports.getIdCloudinary = getIdCloudinary;
