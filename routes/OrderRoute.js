"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const OrderService_1 = require("../services/OrderService");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
router.use(authService_1.auth);
router.route("/").get((0, authService_1.allowTo)("user"), (req, _, next) => {
    const _req = req;
    if (_req.user.role === "user")
        _req.filterObj = { user: _req.user._id };
    next();
}, OrderService_1.getAllOrders);
router.route("/:id").get(OrderService_1.getOrder).post(OrderService_1.createCashOrder);
router.route("/:id/pay").put((0, authService_1.allowTo)("admin"), OrderService_1.updateOrderPayed);
router.route("/:id/deliver").put((0, authService_1.allowTo)("admin"), OrderService_1.updateOrderDelivred);
router.route("/checkout-session/:cartId").post((0, authService_1.allowTo)("user"), OrderService_1.checkoutSession);
exports.orderRoute = router;
