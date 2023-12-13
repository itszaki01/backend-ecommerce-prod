"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    slug: {
        type: String,
        required: [true, "Slug is required"],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false,
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now(),
    },
    passwordResetCode: {
        type: String,
    },
    passwordResetCodeExpires: {
        type: Date,
    },
    passwordResetVerified: {
        type: Boolean,
    },
    profileImg: {
        type: String,
    },
    phone: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    wishlist: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    addresses: [
        {
            alias: { type: "String" },
            details: { type: "String" },
            phone: { type: "String" },
            city: { type: "String" },
            postalCode: { type: "String" },
        },
    ],
}, { timestamps: true });
function setImageUrl(doc) {
    if (doc.profileImg) {
        const imageUrl = `${process.env.BASE_URL}/users/${doc.profileImg}`;
        doc.profileImg = imageUrl;
    }
}
userSchema.post("init", function (doc) {
    setImageUrl(doc);
});
userSchema.post("save", function (doc) {
    setImageUrl(doc);
});
//hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcryptjs_1.default.hash(this.password, 12);
    next();
});
exports.User = mongoose_1.default.model("User", userSchema);
