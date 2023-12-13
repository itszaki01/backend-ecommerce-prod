"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressestRouter = void 0;
const express_1 = __importDefault(require("express"));
const authService_1 = require("../services/authService");
const addressesService_1 = require("../services/addressesService");
const router = express_1.default.Router();
exports.addressestRouter = router;
router.route('/').get(authService_1.auth, (0, authService_1.allowTo)('user'), addressesService_1.getAllAddressesOfLoggedUser).post(authService_1.auth, (0, authService_1.allowTo)('user'), addressesService_1.addAddress);
router.route('/:id').delete(authService_1.auth, (0, authService_1.allowTo)('user'), addressesService_1.removeAddress);
