import express from "express";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import { v4 as uuid } from 'uuid';
import fileStore = require('session-file-store');
import routes from './routes';

var FileStore = fileStore(session);
const port = process.env.PORT || 3000;
const app = express();
app.use(session({
    genid: (req) => {
        return uuid()
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors({
    credentials: true,
    origin: ['https://assessment-fe-1.herokuapp.com', 'http://localhost:3001']
}));
app.set('trust proxy', 1)

app.listen(port, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`API is running on http://localhost:${port}`);
    }
});
