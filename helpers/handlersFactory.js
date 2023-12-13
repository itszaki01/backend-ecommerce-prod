"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.getOne = exports.createOne = exports.updateOne = exports.deleteOne = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const apiError_1 = require("../utils/apiError");
const apiFeatures_1 = require("../utils/apiFeatures");
const ReviewModal_1 = require("../models/ReviewModal");
const deleteOne = (Model) => (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const data = await Model.findOneAndDelete({ _id: id });
    console.log(Model.modelName);
    if (Model.modelName === 'Review') {
        //@ts-ignore
        await ReviewModal_1.Review.calcAvgRatingAndQty(data?.product);
    }
    res.status(200).json({ message: `Deleted Successfuly` });
});
exports.deleteOne = deleteOne;
const updateOne = (Modal) => (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const data = await Modal.findByIdAndUpdate(id, req.body, { new: true });
    data?.save();
    res.json(data);
});
exports.updateOne = updateOne;
const createOne = (Modal, options) => (0, express_async_handler_1.default)(async (req, res) => {
    const data = await Modal.create(req.body);
    res.status(201).json(data);
});
exports.createOne = createOne;
const getOne = (Modal, populateString) => (0, express_async_handler_1.default)(async (req, res, next) => {
    //@ts-ignore
    let query = Modal.findById(req.params.id);
    if (populateString) {
        //@ts-ignore
        query = query.populate(populateString);
    }
    const data = await query;
    if (!data) {
        return next(new apiError_1.ApiError("No data", 404));
    }
    res.json(data);
});
exports.getOne = getOne;
const getAll = (Modal, ByMethod = "ByTitle") => (0, express_async_handler_1.default)(async (req, res, next) => {
    const _req = req;
    const apiFeatures = new apiFeatures_1.ApiFeatures(Modal, Modal, req.query);
    (await (await apiFeatures.filter(_req.filterObj)).search(ByMethod, _req.filterObj)).sort().fieldsLimit().pagination();
    const documents = await apiFeatures.mongooseQuery;
    if (!documents || documents.length === 0) {
        return next(new apiError_1.ApiError(`No documents to show`, 404));
    }
    const response = {
        results: documents.length,
        ...apiFeatures.paginateResults,
        data: documents,
    };
    res.json(response);
});
exports.getAll = getAll;
