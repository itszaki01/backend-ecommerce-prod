"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductModal_1 = require("./ProductModal");
const ReviewSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
    },
    rating: {
        type: "number",
        required: [true, "Rating is required"],
        min: [1, "Min rating is 1"],
        max: [5, "Max rating is 5"],
    },
    title: {
        type: "string",
        required: [true, "Title is required"],
    },
}, {
    timestamps: true,
    statics: {},
});
ReviewSchema.statics.calcAvgRatingAndQty = async function (productId) {
    const results = (await this.aggregate([
        //Stage one: getll reviews of product
        { $match: { product: productId } },
        //Stage two: Group all rviews of the product
        { $group: { _id: "product", avgRating: { $avg: "$rating" }, ratingQty: { $sum: 1 } } },
    ]));
    if (results.length > 0) {
        await ProductModal_1.Product.findByIdAndUpdate(productId, {
            ratingsAverage: results[0].avgRating.toFixed(1),
            ratingsQuantity: results[0].ratingQty,
        });
    }
    else {
        await ProductModal_1.Product.findByIdAndUpdate(productId, {
            ratingsAverage: 0,
            ratingsQuantity: 0,
        });
    }
};
ReviewSchema.post("save", async function (doc) {
    //@ts-ignore
    await this.constructor.calcAvgRatingAndQty(this.product);
});
//Trigger the calc also when remove
// ReviewSchema.post('deleteMany', async function (doc) {
//     //@ts-ignore
//     await this.constructor.calcAvgRatingAndQty(this.product);
// });
// ReviewSchema.post('save', async function (doc) {
//     //@ts-ignore
//     await this.constructor.calcAvgRatingAndQty(doc.product);
// })
//Trigger the calc also when remove
ReviewSchema.post('findOneAndDelete', async function (result, next) {
    // Access the result of the delete operation
    console.log('After findOneAndDelete');
    console.log('Deleted document:', result);
    //@ts-ignore
    await this.c;
    // Continue to the next middleware
    next();
});
ReviewSchema.pre(/^find/, function (next) {
    //@ts-ignore
    this.populate("user", "name");
    next();
});
exports.Review = mongoose_1.default.model("Review", ReviewSchema);
