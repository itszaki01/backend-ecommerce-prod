"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createNewProduct = exports.getProduct = exports.getAllProducts = void 0;
const ProductModal_1 = require("../models/ProductModal");
const handlersFactory_1 = require("../helpers/handlersFactory");
//==========================================
/**
 *  @description Get all products
 *  @route GET /api/v1/products
 *  @access Public
 */
//==========================================
exports.getAllProducts = (0, handlersFactory_1.getAll)(ProductModal_1.Product, 'ByTitle');
//==========================================
/**
 *  @description Get specific product by :id
 *  @route GET /api/v1/products/:id
 *  @access Public
 */
//==========================================
exports.getProduct = (0, handlersFactory_1.getOne)(ProductModal_1.Product, 'reviews');
//==========================================
/**
 *  @description Create new product
 *  @route POST /api/v1/products
 *  @access Private
 */
//==========================================
exports.createNewProduct = (0, handlersFactory_1.createOne)(ProductModal_1.Product);
//==========================================
/**
 *  @description Update specific product by :id
 *  @route PUT /api/v1/products/:id
 *  @access Private
 */
//==========================================
exports.updateProduct = (0, handlersFactory_1.updateOne)(ProductModal_1.Product);
//==========================================
/**
 *  @description Delete specific product by :id
 *  @route DELETE /api/v1/products/:id
 *  @access Private
 */
//==========================================
exports.deleteProduct = (0, handlersFactory_1.deleteOne)(ProductModal_1.Product);
