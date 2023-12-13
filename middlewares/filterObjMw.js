"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterObj = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.filterObj = (0, express_async_handler_1.default)(async (req, res, next) => {
    const _req = req;
    const { categoryID, productID } = _req.params;
    _req.filterObj = {};
    if (categoryID) {
        _req.filterObj = { category: categoryID };
    }
    else if (productID) {
        _req.filterObj = { product: productID };
    }
    next();
});
