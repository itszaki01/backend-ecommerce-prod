"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
require("colors");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("../../config/db");
const ReviewModal_1 = require("../../models/ReviewModal");
dotenv_1.default.config({ path: '../../config.env' });
const DB_URI = process.env.DB_URI;
// connect to DB
(0, db_1.connectDB)(DB_URI);
// Read data
const reviews = JSON.parse(fs_1.default.readFileSync("./reviews.json", "utf8"));
// Insert data into DB
const insertData = async () => {
    try {
        await ReviewModal_1.Review.create(reviews);
        console.log("Data Inserted".green.inverse);
        process.exit();
    }
    catch (error) {
        console.log(error);
    }
};
// Delete data from DB
const destroyData = async () => {
    try {
        await ReviewModal_1.Review.deleteMany();
        console.log("Data Destroyed".red.inverse);
        process.exit();
    }
    catch (error) {
        console.log(error);
    }
};
// node seeder.js -d
if (process.argv[2] === "-i") {
    insertData();
}
else if (process.argv[2] === "-d") {
    destroyData();
}
