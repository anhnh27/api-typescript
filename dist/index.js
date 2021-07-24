"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var express_session_1 = __importDefault(require("express-session"));
var uuid_1 = require("uuid");
var routes_1 = __importDefault(require("./routes"));
var port = process.env.PORT || 3000;
var app = express_1.default();
app.use(express_session_1.default({
    genid: function (req) {
        return uuid_1.v4();
    },
    secret: 'dev',
    resave: false,
    saveUninitialized: true
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(helmet_1.default());
app.use(cors_1.default({ credentials: true, origin: ['https://assessment-fe-1.herokuapp.com', 'http://localhost:3001'] }));
app.use("/", routes_1.default);
app.listen(port, function () {
    if (process.env.NODE_ENV !== 'production') {
        console.log("API is running on http://localhost:" + port);
    }
});
