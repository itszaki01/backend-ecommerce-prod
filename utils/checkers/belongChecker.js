"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.belongChecker = void 0;
const apiError_1 = require("../apiError");
const belongChecker = async (model, payload, compareValue) => {
    const data = await model.findById(payload.data);
    if (payload.role === 'user') {
        if (!data) {
            return Promise.reject(new apiError_1.ApiError("No Data", 400));
        }
        if (data.user._id.toString() !== compareValue.toString()) {
            return Promise.reject(new apiError_1.ApiError("Not Authorized", 401));
        }
    }
    return true;
};
exports.belongChecker = belongChecker;
