"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySlugify = void 0;
const slugify_1 = __importDefault(require("slugify"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.applySlugify = (0, express_async_handler_1.default)(async (req, res, next) => {
    if (req.body.name) {
        req.body.slug = (0, slugify_1.default)(req.body.name);
    }
    else if (req.body.title) {
        req.body.slug = (0, slugify_1.default)(req.body.title);
    }
    next();
});
