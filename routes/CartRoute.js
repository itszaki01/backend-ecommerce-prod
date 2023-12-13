"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoute = void 0;
const express_1 = __importDefault(require("express"));
const CartService_1 = require("../services/CartService");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
router.use(authService_1.auth, (0, authService_1.allowTo)('user'));
router.route('/').get(CartService_1.getLoggedUserItems).post(CartService_1.addItemToCart).put(CartService_1.clearCartItems);
router.put('/applyCoupon', CartService_1.applyCouponToCart);
router.route('/:id').put(CartService_1.updateQuantity).delete(CartService_1.removeItemFromCart);
exports.cartRoute = router;
