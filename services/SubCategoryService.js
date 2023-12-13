"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubCategory = exports.updateSubCategory = exports.createSubCategory = exports.getSubCategory = exports.getAllSubCategories = void 0;
const SubCategoryModal_1 = require("../models/SubCategoryModal");
const handlersFactory_1 = require("../helpers/handlersFactory");
//==========================================
/**
 *  @description get all SubCategory
 *  @route GET /api/v1/subcategories
 *  @nestd_route GET /api/v1/categories/:categoryID/subcategories
 *  @access Public
 */
//==========================================
exports.getAllSubCategories = (0, handlersFactory_1.getAll)(SubCategoryModal_1.SubCategory);
//==========================================
/**
 *  @description Get specific SubCategory by ID
 *  @route GET /api/v1/subcategories/:id
 *  @access Public
 */
//==========================================
exports.getSubCategory = (0, handlersFactory_1.getOne)(SubCategoryModal_1.SubCategory);
//==========================================
/**
 *  @description Create new SubCategory
 *  @route POST /api/v1/subcategories
 *  @access Private
 */
//==========================================
exports.createSubCategory = (0, handlersFactory_1.createOne)(SubCategoryModal_1.SubCategory);
//==========================================
/**
 *  @description Update SubCategory
 *  @route PUT /api/v1/subcategories/:id
 *  @access Private
 */
//==========================================
exports.updateSubCategory = (0, handlersFactory_1.updateOne)(SubCategoryModal_1.SubCategory);
//==========================================
/**
 *  @description Delete SubCategory by ID
 *  @route DELETE /api/v1/subcategories/:id
 *  @access Private
 */
//==========================================
exports.deleteSubCategory = (0, handlersFactory_1.deleteOne)(SubCategoryModal_1.SubCategory);
