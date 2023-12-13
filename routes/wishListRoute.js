"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whishListRouter = void 0;
const express_1 = __importDefault(require("express"));
const wishListService_1 = require("../services/wishListService");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
exports.whishListRouter = router;
router.route('/').get(authService_1.auth, (0, authService_1.allowTo)('user'), wishListService_1.getAllWishListOfLoggedUsre).post(authService_1.auth, (0, authService_1.allowTo)('user'), wishListService_1.addProductToWishList);
router.route('/:id').delete(authService_1.auth, (0, authService_1.allowTo)('user'), wishListService_1.removeProductFromWishList);
