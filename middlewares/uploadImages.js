"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesRsizer = exports.uploadImages = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const multer_1 = __importDefault(require("multer"));
const apiError_1 = require("../utils/apiError");
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
const uploadImages = () => {
    const memoryStoreage = multer_1.default.memoryStorage();
    const imageFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        }
        else {
            //@ts-ignore
            cb(new apiError_1.ApiError("Only Images allowed", 500), false);
        }
    };
    //@ts-ignore
    const upload = (0, multer_1.default)({ storage: memoryStoreage, fileFilter: imageFilter });
    //UploadImage
    return upload.fields([
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 5 },
    ]);
};
exports.uploadImages = uploadImages;
exports.imagesRsizer = (0, express_async_handler_1.default)(async (req, res, next) => {
    const _req = req;
    if (_req.files.imageCover) {
        const filename = `products-${(0, uuid_1.v4)()}-${Date.now()}.jpeg`;
        await (0, sharp_1.default)(_req.files.imageCover[0].buffer)
            .resize(500, 500)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`uploads/product/${filename}`);
        _req.body.imageCover = filename;
    }
    if (req.files) {
        req.body.images = await Promise.all(_req.files.images.map(async (img, idx) => {
            const filename = `products-${(0, uuid_1.v4)()}-${Date.now()}${idx}.jpeg`;
            await (0, sharp_1.default)(img.buffer).resize(500, 500).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`uploads/product/${filename}`);
            return filename;
        }));
    }
    next();
});
