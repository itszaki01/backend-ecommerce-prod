"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: "string",
        required: [true, "Category Required"],
        trim: true,
        minlength: [6, "Too short category length"],
        maxlength: [32, "Too long category name"],
        unique: true,
    },
    slug: {
        type: "string",
        lowercase: true,
        trim: true
    },
    image: {
        type: "string",
    },
}, {
    timestamps: true,
});
function setImageUrl(doc) {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/category/${doc.image}`;
        doc.image = imageUrl;
    }
}
categorySchema.post('init', function (doc) {
    setImageUrl(doc);
});
categorySchema.post('save', function (doc) {
    setImageUrl(doc);
});
exports.CategoryModal = mongoose_1.default.model("Category", categorySchema);
