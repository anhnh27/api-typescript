import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import { createConnection } from "typeorm";
import routes from "./routes";
import AppError from "./utils/appError";
import { globalErrorHandler } from "./controllers/error.controller";

class App {
  public start = () => {
    createConnection()
      .then(async (_connection) => {
        const PORT = process.env.PORT || 8000;
        const server: Application = express();

        // midlewares
        server.use(express.urlencoded({ extended: true }));
        server.use(express.json());
        server.use(helmet());
        server.use(cors());

        // define routes
        server.use("/api/v1/", routes);
        server.all("*", (req: Request, res: Response, next: NextFunction) => {
          next(new AppError("404_NOT_FOUND", 404));
        });
        server.use(globalErrorHandler);

        server.listen(PORT, () => {
          if (process.env.NODE_ENV === "development") {
            console.log(`🚀 API is running on http://localhost:${PORT}/api/v1`);
          }
        });
      })
      .catch((error) => console.log(error));
  };
}

const app = new App();
app.start();
