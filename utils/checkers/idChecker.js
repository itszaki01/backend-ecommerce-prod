"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idChecker = void 0;
const idChecker = async (Modal, id) => {
    const data = await Modal.findById(id);
    if (!data) {
        return Promise.reject(new Error(`No document for this id ${id}`));
    }
    else {
        return true;
    }
};
exports.idChecker = idChecker;
