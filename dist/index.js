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
var fileStore = require("session-file-store");
var routes_1 = __importDefault(require("./routes"));
var FileStore = fileStore(express_session_1.default);
var port = process.env.PORT || 3000;
var app = express_1.default();
app.use(express_session_1.default({
    genid: function (req) {
        return uuid_1.v4();
    },
    secret: '3Aa7d3e557-e628-45aa-be24-f692b10d9b41',
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 * 24
    },
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(helmet_1.default());
app.use(cors_1.default({ credentials: true, origin: ['https://assessment-fe-1.herokuapp.com', 'http://localhost:3001'] }));
app.use("/", routes_1.default);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.set('trust proxy', 1);
app.listen(port, function () {
    if (process.env.NODE_ENV !== 'production') {
        console.log("API is running on http://localhost:" + port);
    }
});
