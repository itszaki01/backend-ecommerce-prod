"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    cartItems: [
        {
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Product",
            },
            color: { type: "String" },
            quantitiy: { type: "Number", default: 1 },
            price: { type: "Number" },
        },
    ],
    totalCartPrice: { type: "Number" },
    totalPriceAfterDiscount: { type: "Number" },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Cart = mongoose_1.default.model("Cart", cartSchema);
