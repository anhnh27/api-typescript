"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
var authorization = function (req, res, next) {
    if (req.session)
        return next();
    else
        return res.sendStatus(401);
};
exports.authorization = authorization;
