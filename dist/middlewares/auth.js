"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var twt_1 = __importDefault(require("../config/twt"));
var authorization = function (req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization)
        return res.sendStatus(403);
    var bearer = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ");
    var bearerToken = bearer[1];
    jsonwebtoken_1.default.verify(bearerToken, twt_1.default, function (err, result) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            next();
        }
    });
};
exports.authorization = authorization;
