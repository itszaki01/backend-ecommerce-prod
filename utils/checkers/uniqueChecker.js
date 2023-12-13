"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueChecker = void 0;
const uniqueChecker = async (Modal, payload) => {
    const data = await Modal.findOne(payload.data);
    if (data) {
        return Promise.reject(new Error(`${payload.field} already exists`));
    }
    else {
        return true;
    }
};
exports.uniqueChecker = uniqueChecker;
