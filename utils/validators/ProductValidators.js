"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductValidator = exports.updateProductValidator = exports.getProductValidator = exports.createProductValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMw_1 = require("../../middlewares/validatorMw");
const subCategoryChecker_1 = require("../checkers/subCategoryChecker");
const applySlugify_1 = require("../../middlewares/applySlugify");
const ProductModal_1 = require("../../models/ProductModal");
const idChecker_1 = require("../checkers/idChecker");
const CategoryModal_1 = require("../../models/CategoryModal");
const BrandModal_1 = require("../../models/BrandModal");
// export const parseBody = async (req, res, next) => {
//     const form = new formidable.IncomingForm();
//     const _req = req as any
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error parsing form data' });
//       }
//       // Combine form fields and body data into a single JSON object
//       let jsonData = {} as any
//         for (const key in fields) {
//             //@ts-ignore
//             jsonData[key] = fields[key][0]
//         }
//       req.test = jsonData
//       console.log(req.test);
//     });
//     next()
// }
exports.createProductValidator = [
    applySlugify_1.applySlugify,
    (0, express_validator_1.check)("title").isLength({ min: 3 }).withMessage("title must be at least 3 chars").notEmpty().withMessage("Product required"),
    (0, express_validator_1.check)("description").notEmpty().withMessage("Product description is required").isLength({ max: 1000 }).withMessage("Too long description"),
    (0, express_validator_1.check)("quantity").notEmpty().withMessage("Product quantity is required").isNumeric().withMessage("Product quantity must be a number"),
    (0, express_validator_1.check)("sold").optional().isNumeric().withMessage("Product quantity must be a number"),
    (0, express_validator_1.check)("price")
        .notEmpty()
        .withMessage("Product price is required")
        .isNumeric()
        .withMessage("Product price must be a number")
        .isLength({ max: 32 })
        .withMessage("To long price"),
    (0, express_validator_1.check)("priceAfterDiscount")
        .optional()
        .isNumeric()
        .withMessage("Product priceAfterDiscount must be a number")
        .toFloat()
        .custom((value, { req }) => {
        if (req.body.price <= value) {
            throw new Error("priceAfterDiscount must be lower than price");
        }
        return true;
    }),
    (0, express_validator_1.check)("colors").optional().isArray().withMessage("availableColors should be array of string"),
    (0, express_validator_1.check)("imageCover"),
    (0, express_validator_1.check)("images").optional().isArray().withMessage("images should be array of string"),
    (0, express_validator_1.check)("category")
        .notEmpty()
        .withMessage("Product must be belong to a category")
        .isMongoId()
        .withMessage("Invalid ID formate")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(CategoryModal_1.CategoryModal, value);
    }),
    (0, express_validator_1.check)("subcategories")
        .optional()
        .isMongoId()
        .withMessage("Invalid ID formate")
        .isArray()
        .custom(subCategoryChecker_1.multiSubCategoryChecker)
        .custom(subCategoryChecker_1.subCategoryBelongCategoryChecker),
    (0, express_validator_1.check)("brand")
        .optional()
        .isMongoId()
        .withMessage("Invalid ID formate")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(BrandModal_1.Brand, value);
    }),
    (0, express_validator_1.check)("ratingsAverage")
        .optional()
        .isNumeric()
        .withMessage("ratingsAverage must be a number")
        .isLength({ min: 1 })
        .withMessage("Rating must be above or equal 1.0")
        .isLength({ max: 5 })
        .withMessage("Rating must be below or equal 5.0"),
    (0, express_validator_1.check)("ratingsQuantity").optional().isNumeric().withMessage("ratingsQuantity must be a number"),
    validatorMw_1.validatorMw,
];
exports.getProductValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid product id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(ProductModal_1.Product, value);
    }),
    validatorMw_1.validatorMw,
];
exports.updateProductValidator = [
    applySlugify_1.applySlugify,
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid product id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(ProductModal_1.Product, value);
    }),
    validatorMw_1.validatorMw,
];
exports.deleteProductValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid product id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(ProductModal_1.Product, value);
    }),
    validatorMw_1.validatorMw,
];
