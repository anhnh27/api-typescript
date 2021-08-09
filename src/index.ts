import "reflect-metadata";
import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import { createConnection } from "typeorm";
import routes from './routes';

createConnection().then(async _connection => {
    const PORT = process.env.PORT || 8000;
    const app: Application = express();

    // midlewares
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(helmet());
    app.use(cors())
    // app.use(cors({ credentials: true, origin: 'https://assessment-fe-1.herokuapp.com' }));
    // app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

    // define routes
    app.use("/", routes);
    app.listen(PORT, () => {
        console.log(`API is running on http://localhost:${PORT}`);
    });
}).catch(error => console.log(error));
