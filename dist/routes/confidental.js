"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var confidentalRoute = express_1.default.Router();
confidentalRoute.get("/confidental", function (req, res) {
    return res.status(200).json({ data: 'This is privated information.' });
});
exports.default = confidentalRoute;
