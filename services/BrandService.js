"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.updateBrand = exports.createBrand = exports.getBrand = exports.getAllBrands = void 0;
const BrandModal_1 = require("../models/BrandModal");
const handlersFactory_1 = require("../helpers/handlersFactory");
//==========================================
/**
 *  @description Get all Brands
 *  @route GET /api/v1/brands
 *  @access Public
 */
//==========================================
exports.getAllBrands = (0, handlersFactory_1.getAll)(BrandModal_1.Brand);
//==========================================
/**
 *  @description Get Brand by ID
 *  @route GET /api/v1/brands/:id
 *  @access Public
 */
//==========================================
exports.getBrand = (0, handlersFactory_1.getOne)(BrandModal_1.Brand);
//==========================================
/**
 *  @description Create Brand
 *  @route POST /api/v1/brands/
 *  @access Private
 */
//==========================================
exports.createBrand = (0, handlersFactory_1.createOne)(BrandModal_1.Brand);
//==========================================
/**
 *  @description Update Brand by ID
 *  @route PUT /api/v1/brands/:id
 *  @access Private
 */
//==========================================
exports.updateBrand = (0, handlersFactory_1.updateOne)(BrandModal_1.Brand);
//==========================================
/**
 *  @description Delete Brand by ID
 *  @route DELETE /api/v1/brands/:id
 *  @access Private
 */
//==========================================
exports.deleteBrand = (0, handlersFactory_1.deleteOne)(BrandModal_1.Brand);
