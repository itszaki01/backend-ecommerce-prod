"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const SubCategoryService_1 = require("../services/SubCategoryService");
const subCategoryValidators_1 = require("../utils/validators/subCategoryValidators");
const filterObjMw_1 = require("../middlewares/filterObjMw");
const authService_1 = require("../services/authService");
//===================================================================================
const router = express_1.default.Router({ mergeParams: true });
router.route("/").get(subCategoryValidators_1.getAllSubCategoryValidator, filterObjMw_1.filterObj, SubCategoryService_1.getAllSubCategories).post(authService_1.auth, (0, authService_1.allowTo)('admin'), subCategoryValidators_1.createSubCategoryValidator, SubCategoryService_1.createSubCategory);
router
    .route("/:id")
    .get(subCategoryValidators_1.getSubCategoryValidator, SubCategoryService_1.getSubCategory)
    .put(authService_1.auth, (0, authService_1.allowTo)('admin'), subCategoryValidators_1.updateSubCategoryValidator, SubCategoryService_1.updateSubCategory)
    .delete(authService_1.auth, (0, authService_1.allowTo)('admin'), subCategoryValidators_1.deleteSubCategoryValidator, SubCategoryService_1.deleteSubCategory);
exports.SubCategoryRoute = router;
