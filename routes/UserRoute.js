"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const userService_1 = require("../services/userService");
const uploadOneImg_1 = require("../middlewares/uploadOneImg");
const UserValidator_1 = require("../utils/validators/UserValidator");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
exports.UserRoute = router;
router.get("/getMe", authService_1.auth, userService_1.getLoggedUserData, userService_1.getUser);
router.put("/changeMyPassword", authService_1.auth, UserValidator_1.updateLoggedUserPasswordValidator, userService_1.updateLoggedUserPassword);
router.put("/updateMe", authService_1.auth, UserValidator_1.updateLoggedUserProfileValidator, userService_1.updateLoggedUserProfile, userService_1.updateUser);
router
    .route("/")
    .get(authService_1.auth, (0, authService_1.allowTo)("admin"), userService_1.getAllUsers)
    .post(authService_1.auth, (0, authService_1.allowTo)("admin"), (0, uploadOneImg_1.uploadSingleImage)("profileImg"), UserValidator_1.creatUserValidator, (0, uploadOneImg_1.resizeSingleImg)("users"), userService_1.createUser);
router
    .route("/:id")
    .get(authService_1.auth, (0, authService_1.allowTo)("admin"), UserValidator_1.getUserValidator, userService_1.getUser)
    .put(authService_1.auth, (0, authService_1.allowTo)("admin"), (0, uploadOneImg_1.uploadSingleImage)("profileImg"), UserValidator_1.updateUserValidator, (0, uploadOneImg_1.resizeSingleImg)("users"), userService_1.updateUser)
    .delete(authService_1.auth, (0, authService_1.allowTo)("admin"), UserValidator_1.deleteUserValidator, userService_1.deleteUser);
router.put("/changePassword/:id", authService_1.auth, (0, authService_1.allowTo)("admin"), UserValidator_1.changePasswordValidator, userService_1.changePassword);
