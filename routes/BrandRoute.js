"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandRoute = void 0;
const express_1 = __importDefault(require("express"));
const BrandService_1 = require("../services/BrandService");
const BrandValidators_1 = require("../utils/validators/BrandValidators");
const uploadOneImg_1 = require("../middlewares/uploadOneImg");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
router.route("/").get(BrandService_1.getAllBrands).post(authService_1.auth, (0, authService_1.allowTo)("admin"), (0, uploadOneImg_1.uploadSingleImage)(), BrandValidators_1.createBrandValidator, (0, uploadOneImg_1.resizeSingleImg)("brand"), BrandService_1.createBrand);
router
    .route("/:id")
    .get(BrandValidators_1.getBrandValidator, BrandService_1.getBrand)
    .put(authService_1.auth, (0, authService_1.allowTo)("admin"), BrandValidators_1.updateBrandValidator, BrandService_1.updateBrand)
    .delete(authService_1.auth, (0, authService_1.allowTo)("admin"), BrandValidators_1.deleteBrandValidator, BrandService_1.deleteBrand);
exports.BrandRoute = router;
