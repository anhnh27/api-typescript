import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import { createConnection } from "typeorm";
import routes from "./routes";

declare interface Error {
  status: string;
}
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
          let err = new Error("NOT FOUND");
          err.status = "fail";
          err.statusCode = 404;
          next(err);
        });
        server.use(
          (err: Error, req: Request, res: Response, next: NextFunction) => {
            err.statusCode = err.statusCode || 500;
            err.status = err.status || "error";

            res.status(err.status).send({
              status: err.status,
              message: err.message,
            });
          }
        );
        server.listen(PORT, () => {
          console.log(process.env);
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
