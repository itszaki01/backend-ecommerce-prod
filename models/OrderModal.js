"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user id is required"],
    },
    cartItems: [
        {
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Product",
            },
            color: { type: "String" },
            quantitiy: { type: "Number" },
            price: { type: "Number" },
        },
    ],
    shippingAddress: {
        details: 'string',
        phone: 'string',
        city: 'string',
        postalCode: 'string'
    },
    taxPrice: { type: 'number', default: 0 },
    shippingPrice: { type: 'number', default: 0 },
    totalOrderPrice: "Number",
    paymentMethod: {
        type: "String",
        enum: ["card", "cash"],
        default: "cash",
    },
    isPaid: "boolean",
    paidAt: "date",
    isDelivred: "boolean",
    delivredAt: "Date",
}, {
    timestamps: true
});
orderSchema.pre(/^find/, function (next) {
    //@ts-ignore
    this.populate('user', 'name');
    //@ts-ignore
    this.populate('cartItems.product', 'name imageCover -_id');
    next();
});
exports.Order = mongoose_1.default.model("Order", orderSchema);
