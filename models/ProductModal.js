"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    title: {
        type: "string",
        required: [true, "Title is required"],
        trim: true,
        minlength: [3, "Too short title"],
        maxlength: [120, "Too long title"],
    },
    slug: {
        type: "string",
        lowercase: true,
        required: [true, "Slug is required"],
        trim: true,
    },
    description: {
        type: "string",
        required: [true, "Description is required"],
        trim: true,
        minlength: [10, "Too short description"],
        maxlength: [1000, "Too long description"],
    },
    price: {
        type: "number",
        required: [true, "Price is required"],
        max: [200000, "Max price is 200000"],
    },
    discount: {
        type: "number",
    },
    priceAfterDiscount: {
        type: "number",
    },
    quantity: {
        type: "number",
        required: [true, "Quantitiy is required"],
    },
    sold: {
        type: "number",
        default: 0,
    },
    remining_quantity: {
        type: "number",
        default: function () {
            return this.quantity;
        },
    },
    imageCover: {
        type: "string",
        required: [true, "Image Cover is required"],
    },
    images: {
        type: ["string"],
    },
    colors: {
        type: ["string"],
    },
    brand: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Brand",
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "Category is required"],
        ref: "Category",
    },
    subcategories: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "SubCategory",
        },
    ],
    ratingsAverage: {
        type: "number",
        min: [1, "Min rating is 1"],
        max: [5, "Max rating is 5"],
    },
    ratingsQuantity: {
        type: "number",
        default: 0,
    },
}, {
    timestamps: true,
    //to enable vertuials
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id',
});
productSchema.pre(/^find/, function (next) {
    //@ts-ignore
    this.populate("category", "name");
    //@ts-ignore
    this.populate("brand", "name");
    //@ts-ignore
    this.populate("subcategories", "name");
    next();
});
function setImageUrl(doc) {
    if (doc.imageCover) {
        const imageUrl = `${process.env.BASE_URL}/product/${doc.imageCover}`;
        doc.imageCover = imageUrl;
    }
    if (doc.images) {
        doc.images = doc.images.map((img) => {
            return `${process.env.BASE_URL}/product/${img}`;
        });
    }
}
productSchema.post("init", function (doc) {
    setImageUrl(doc);
});
productSchema.post("save", function (doc) {
    setImageUrl(doc);
});
exports.Product = mongoose_1.default.model("Product", productSchema);
