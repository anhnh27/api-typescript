import express from "express";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import { v4 as uuid } from 'uuid';
import routes from './routes';

const port = process.env.PORT || 8080;
const app = express();
app.use(session({
    genid: (req) => {
        return uuid()
    },
    secret: 'dev',
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors({ credentials: true, origin: 'https://assessment-fe-1.herokuapp.com' }));
app.use("/", routes);

app.listen(port, () => {
    console.log(`API is running`);
});
