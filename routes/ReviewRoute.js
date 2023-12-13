"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoute = void 0;
const express_1 = __importDefault(require("express"));
const authService_1 = require("../services/authService");
const ReviewService_1 = require("../services/ReviewService");
const filterObjMw_1 = require("../middlewares/filterObjMw");
const ReviewValidators_1 = require("../utils/validators/ReviewValidators");
const router = express_1.default.Router({ mergeParams: true });
router
    .route("/")
    .get(filterObjMw_1.filterObj, ReviewService_1.getAllReviews)
    //create review handler
    .post(authService_1.auth, (0, authService_1.allowTo)("user"), async (req, _, next) => {
    const _req = req;
    _req.body.user = _req.user.id;
    if (_req.params.productID)
        _req.body.product = _req.params.productID;
    next();
}, ReviewValidators_1.createReviewValidator, ReviewService_1.createReview);
router.route("/:id").get(ReviewValidators_1.getReviewValidator, ReviewService_1.getReview).put(authService_1.auth, (0, authService_1.allowTo)("user"), ReviewValidators_1.updateReviewValidator, ReviewService_1.updateReview).delete(authService_1.auth, (0, authService_1.allowTo)("user", "admin"), ReviewValidators_1.deleteReviewValidator, ReviewService_1.deleteReview);
exports.ReviewRoute = router;
