"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subCategorySchema = new mongoose_1.default.Schema({
    name: {
        type: "string",
        required: [true, "Name is required"],
        unique: true,
        trim: true,
        minlength: [2, 'Too short subcategory name'],
        maxlength: [32, 'Too long subcategory name']
    },
    slug: {
        type: 'string',
        lowercase: true,
        trim: true
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'SubCategory must be belong to parent category']
    },
}, {
    timestamps: true,
});
subCategorySchema.pre(/^find/, function (next) {
    //@ts-ignore
    this.populate("category", "name");
    next();
});
exports.SubCategory = mongoose_1.default.model('SubCategory', subCategorySchema);
