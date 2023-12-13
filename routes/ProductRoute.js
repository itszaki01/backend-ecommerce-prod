"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = __importDefault(require("express"));
const ProductService_1 = require("../services/ProductService");
const ProductValidators_1 = require("../utils/validators/ProductValidators");
const uploadImages_1 = require("../middlewares/uploadImages");
const authService_1 = require("../services/authService");
const ReviewRoute_1 = require("./ReviewRoute");
const router = express_1.default.Router();
//Product Routes
//@ts-ignore
router.route("/").get(ProductService_1.getAllProducts).post(authService_1.auth, (0, authService_1.allowTo)('admin'), (0, uploadImages_1.uploadImages)(), ProductValidators_1.createProductValidator, uploadImages_1.imagesRsizer, ProductService_1.createNewProduct);
// router.route("/").get(getAllProducts).post(parseBody, createNewProduct);
router
    .route("/:id")
    .get(ProductValidators_1.getProductValidator, ProductService_1.getProduct)
    .put(authService_1.auth, (0, authService_1.allowTo)('admin'), ProductValidators_1.updateProductValidator, ProductService_1.updateProduct)
    .delete(authService_1.auth, (0, authService_1.allowTo)('admin'), ProductValidators_1.deleteProductValidator, ProductService_1.deleteProduct);
router.use('/:productID/reviews', ReviewRoute_1.ReviewRoute);
exports.ProductRoute = router;
