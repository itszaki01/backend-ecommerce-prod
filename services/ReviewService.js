"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReview = exports.getAllReviews = void 0;
const handlersFactory_1 = require("../helpers/handlersFactory");
const ReviewModal_1 = require("../models/ReviewModal");
//==========================================
/**
 *  @description Get All Reviews by Product :id
 *  @route GET /api/v1/products/:id/reviews
 *  @access Public
 */
//==========================================
exports.getAllReviews = (0, handlersFactory_1.getAll)(ReviewModal_1.Review);
//==========================================
/**
 *  @description Get Review by :id
 *  @route GET /api/v1/reviews/:id
 *  @access Public
 */
//==========================================
exports.getReview = (0, handlersFactory_1.getOne)(ReviewModal_1.Review);
//==========================================
/**
 *  @description Create Review by Product
 *  @route POST /api/v1/reviews/
 *  @access Private/Protected/User
 */
//==========================================
exports.createReview = (0, handlersFactory_1.createOne)(ReviewModal_1.Review, 'review');
//==========================================
/**
 *  @description Update Review by :id
 *  @route PUT /api/v1/reviews/:id
 *  @access Private/Protected/User
 */
//==========================================
exports.updateReview = (0, handlersFactory_1.updateOne)(ReviewModal_1.Review);
//==========================================
/**
 *  @description Delete Review by :id
 *  @route DELETE /api/v1/reviews/:id
 *  @access Private/Protected/User-Admin
 */
//==========================================
exports.deleteReview = (0, handlersFactory_1.deleteOne)(ReviewModal_1.Review);
