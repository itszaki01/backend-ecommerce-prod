"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountedRoutes = void 0;
const AddressesRoute_1 = require("./AddressesRoute");
const BrandRoute_1 = require("./BrandRoute");
const CartRoute_1 = require("./CartRoute");
const CategoryRoute_1 = require("./CategoryRoute");
const CouponRoute_1 = require("./CouponRoute");
const OrderRoute_1 = require("./OrderRoute");
const ProductRoute_1 = require("./ProductRoute");
const ReviewRoute_1 = require("./ReviewRoute");
const SubCategoryRoute_1 = require("./SubCategoryRoute");
const UserRoute_1 = require("./UserRoute");
const authRoute_1 = require("./authRoute");
const wishListRoute_1 = require("./wishListRoute");
const mountedRoutes = (app, BASE_PATH) => {
    app.use(`${BASE_PATH}/categories`, CategoryRoute_1.CategoryRouter);
    app.use(`${BASE_PATH}/subcategories`, SubCategoryRoute_1.SubCategoryRoute);
    app.use(`${BASE_PATH}/brands`, BrandRoute_1.BrandRoute);
    app.use(`${BASE_PATH}/products`, ProductRoute_1.ProductRoute);
    app.use(`${BASE_PATH}/users`, UserRoute_1.UserRoute);
    app.use(`${BASE_PATH}/auth`, authRoute_1.authRoute);
    app.use(`${BASE_PATH}/reviews`, ReviewRoute_1.ReviewRoute);
    app.use(`${BASE_PATH}/wishlist`, wishListRoute_1.whishListRouter);
    app.use(`${BASE_PATH}/addresses`, AddressesRoute_1.addressestRouter);
    app.use(`${BASE_PATH}/coupons`, CouponRoute_1.couponRoute);
    app.use(`${BASE_PATH}/cart`, CartRoute_1.cartRoute);
    app.use(`${BASE_PATH}/orders`, OrderRoute_1.orderRoute);
};
exports.mountedRoutes = mountedRoutes;
