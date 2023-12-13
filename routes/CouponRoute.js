"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponRoute = void 0;
const express_1 = __importDefault(require("express"));
const authService_1 = require("../services/authService");
const CouponService_1 = require("../services/CouponService");
const router = express_1.default.Router();
router.use(authService_1.auth, (0, authService_1.allowTo)("admin"));
router.route("/").get(CouponService_1.getAllCoupons).post(CouponService_1.createCoupon);
router.route("/:id").get(CouponService_1.getCoupon).put(CouponService_1.updateCoupon).delete(CouponService_1.deleteCoupon);
exports.couponRoute = router;
