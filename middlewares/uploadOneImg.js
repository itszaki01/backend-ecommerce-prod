"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeSingleImg = exports.uploadSingleImage = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
const apiError_1 = require("../utils/apiError");
const memoryStoreage = multer_1.default.memoryStorage();
const uploadSingleImage = (fieldName = "image") => {
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
    return upload.single(fieldName);
};
exports.uploadSingleImage = uploadSingleImage;
//ResizeImage
const resizeSingleImg = (pathName, imgSize = 500) => (0, express_async_handler_1.default)(async (req, res, next) => {
    if (req.file) {
        const filename = `${pathName}-${(0, uuid_1.v4)()}-${Date.now()}.jpeg`;
        await (0, sharp_1.default)(req.file?.buffer)
            .resize(imgSize, imgSize)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`uploads/${pathName}/${filename}`);
        if (pathName === "product") {
            req.body.imageCover = filename;
        }
        else if (pathName === "users") {
            req.body.profileImg = filename;
        }
        else {
            req.body.image = filename;
        }
    }
    next();
});
exports.resizeSingleImg = resizeSingleImg;
