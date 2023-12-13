"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const couponSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true,
        required: [true, 'Please enter coupon name'],
    },
    expire: {
        type: Date,
        required: [true, 'Please enter coupon expire date'],
    },
    discount: {
        type: Number,
        required: [true, 'Please enter coupon discount'],
    },
}, {
    timestamps: true,
});
exports.Coupon = mongoose_1.default.model('Coupon', couponSchema);
