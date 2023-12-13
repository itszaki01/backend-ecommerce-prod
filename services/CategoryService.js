"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createNewCategory = exports.getCategory = exports.getAllCategories = void 0;
const CategoryModal_1 = require("../models/CategoryModal");
const handlersFactory_1 = require("../helpers/handlersFactory");
//==========================================
/**
 *  @description Get all categorys
 *  @route GET /api/v1/categories
 *  @access Public
 */
//==========================================
exports.getAllCategories = (0, handlersFactory_1.getAll)(CategoryModal_1.CategoryModal);
//==========================================
/**
 *  @description Get specific category by :id
 *  @route GET /api/v1/categories/:id
 *  @access Public
 */
//==========================================
exports.getCategory = (0, handlersFactory_1.getOne)(CategoryModal_1.CategoryModal);
//==========================================
/**
 *  @description Create new category
 *  @route POST /api/v1/categories
 *  @access Private
 */
//==========================================
exports.createNewCategory = (0, handlersFactory_1.createOne)(CategoryModal_1.CategoryModal);
//==========================================
/**
 *  @description Update specific category by :id
 *  @route PUT /api/v1/categories/:id
 *  @access Private
 */
//==========================================
exports.updateCategory = (0, handlersFactory_1.updateOne)(CategoryModal_1.CategoryModal);
//==========================================
/**
 *  @description Delete specific category by :id
 *  @route DELETE /api/v1/categories/:id
 *  @access Private
 */
//==========================================
exports.deleteCategory = (0, handlersFactory_1.deleteOne)(CategoryModal_1.CategoryModal);
