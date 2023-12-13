"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
const route404Hanlder_1 = require("./middlewares/route404Hanlder");
const expressErrorHandler_1 = require("./middlewares/expressErrorHandler");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = require("./routes");
const OrderService_1 = require("./services/OrderService");
//Configs
dotenv_1.default.config({ path: "./config.env" });
const NODE_ENV = process.env.NODE_ENV;
const DB_URI = process.env.DB_URI;
const PORT = Number(process.env.PORT);
const BASE_PATH = process.env.BASE_PATH;
//Create app
const app = (0, express_1.default)();
//allow other domains to access the api
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
//compress the api response
app.use((0, compression_1.default)());
//allow static files
app.use(express_1.default.static(path_1.default.join(__dirname, "uploads")));
//ConnectDB
(0, db_1.connectDB)(DB_URI);
//Middlewares
app.use(express_1.default.json());
// app.use(uploadProgressMiddleware)
if (NODE_ENV.startsWith("DEV")) {
    app.use((0, morgan_1.default)("dev"));
    console.log(`Mode == ${NODE_ENV}`);
}
else {
    console.log(`Mode == ${NODE_ENV}`);
}
//Routes
(0, routes_1.mountedRoutes)(app, BASE_PATH);
app.post('/webhook-checkout', express_1.default.raw({ type: 'application/json' }), OrderService_1.webhookCheckout);
//Express Error Hanlders
app.all("*", route404Hanlder_1.route404Hanlder);
app.use(expressErrorHandler_1.expressErrorHandler);
//Server Listner
const server = app.listen(PORT, () => {
    console.log("Server is Running on port ", PORT);
});
//Rejection Handler
process.on("unhandledRejection", (err) => {
    console.log(`\n -----------------------------------------
        \n => Unhandled Error: ${err}
        \n -----------------------------------------
        \n => Message: ${err.message}
        \n -----------------------------------------
        \n => Stack ${err.stack}
        \n -----------------------------------------`);
    server.close(() => {
        console.log("Server Shutdown...");
        process.exit(1);
    });
});
