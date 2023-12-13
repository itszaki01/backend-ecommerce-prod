"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoupon = exports.updateCoupon = exports.createCoupon = exports.getCoupon = exports.getAllCoupons = void 0;
const handlersFactory_1 = require("../helpers/handlersFactory");
const CouponModal_1 = require("../models/CouponModal");
//==========================================
/**
 *  @description Get all Coupons
 *  @route GET /api/v1/coupons
 *  @access Public
 */
//==========================================
exports.getAllCoupons = (0, handlersFactory_1.getAll)(CouponModal_1.Coupon);
//==========================================
/**
 *  @description Get Coupon by ID
 *  @route GET /api/v1/coupons/:id
 *  @access Public
 */
//==========================================
exports.getCoupon = (0, handlersFactory_1.getOne)(CouponModal_1.Coupon);
//==========================================
/**
 *  @description Create Coupon
 *  @route POST /api/v1/coupons/
 *  @access Private
 */
//==========================================
exports.createCoupon = (0, handlersFactory_1.createOne)(CouponModal_1.Coupon);
//==========================================
/**
 *  @description Update Coupon by ID
 *  @route PUT /api/v1/coupons/:id
 *  @access Private
 */
//==========================================
exports.updateCoupon = (0, handlersFactory_1.updateOne)(CouponModal_1.Coupon);
//==========================================
/**
 *  @description Delete Coupon by ID
 *  @route DELETE /api/v1/coupons/:id
 *  @access Private
 */
//==========================================
exports.deleteCoupon = (0, handlersFactory_1.deleteOne)(CouponModal_1.Coupon);
