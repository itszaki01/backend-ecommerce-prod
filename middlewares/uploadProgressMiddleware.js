"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProgressMiddleware = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.uploadProgressMiddleware = (0, express_async_handler_1.default)((req, res, next) => {
    //@ts-ignore
    let totalBytes = req.headers['content-length'] ? parseInt(req.headers['content-length']) : 0;
    let uploadedBytes = 0;
    console.log('called');
    req.on("data", (chunk) => {
        uploadedBytes += chunk.length;
        const percentage = (uploadedBytes / totalBytes) * 100;
        console.log(`Uploaded ${Math.trunc(percentage)}% of 100% bytes`);
    });
    req.on("end", () => {
        console.log("Upload completed");
    });
    // Call the next middleware or route handler
    next();
});
