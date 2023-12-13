"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const CategoryService_1 = require("../services/CategoryService");
const categoryValidators_1 = require("../utils/validators/categoryValidators");
const SubCategoryRoute_1 = require("./SubCategoryRoute");
const uploadOneImg_1 = require("../middlewares/uploadOneImg");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
//Category Routes
router.route("/").get(CategoryService_1.getAllCategories).post(authService_1.auth, (0, authService_1.allowTo)('admin'), (0, uploadOneImg_1.uploadSingleImage)(), categoryValidators_1.createCategoryValidator, (0, uploadOneImg_1.resizeSingleImg)('category'), CategoryService_1.createNewCategory);
router
    .route("/:id")
    .get(categoryValidators_1.getCategoryValidator, CategoryService_1.getCategory)
    .put(authService_1.auth, (0, authService_1.allowTo)('admin'), (0, uploadOneImg_1.uploadSingleImage)(), categoryValidators_1.updateCategoryValidator, (0, uploadOneImg_1.resizeSingleImg)('category'), CategoryService_1.updateCategory)
    .delete(authService_1.auth, (0, authService_1.allowTo)('admin'), categoryValidators_1.deleteCategoryValidator, CategoryService_1.deleteCategory);
//Readirect nested route to subcategries route
router.use("/:categoryID/subcategories", SubCategoryRoute_1.SubCategoryRoute);
exports.CategoryRouter = router;
