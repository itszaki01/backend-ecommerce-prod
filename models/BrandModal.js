"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const brandSchema = new mongoose_1.default.Schema({
    name: {
        type: "string",
        required: [true, "Name is required"],
        unique: true,
        trim: true,
        minlength: [2, 'Too short brand name'],
        maxlength: [32, 'Too long brand name']
    },
    slug: {
        type: 'string',
        lowercase: true,
        trim: true
    },
    image: {
        type: 'string',
    }
}, {
    timestamps: true,
});
function setImageUrl(doc) {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/brand/${doc.image}`;
        doc.image = imageUrl;
    }
}
brandSchema.post('init', function (doc) {
    setImageUrl(doc);
});
brandSchema.post('save', function (doc) {
    setImageUrl(doc);
});
exports.Brand = mongoose_1.default.model('Brand', brandSchema);
