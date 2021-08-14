import { NextFunction, Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entities/user";
import { withTryCatch } from "../utils/withTryCatch";
import AppError from "../utils/appError";

export default class UserController {
  static register = withTryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const userRepository: Repository<User> = getRepository(User);
      const { email, password, firstName, lastName, profilePic } = req.body;

      const user = new User();
      user.email = email;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;
      user.profilePic = profilePic;

      //Validade if the parameters are ok
      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }

      let result = await userRepository.save(user);
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  );

  static updateProfile = withTryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const userRepository: Repository<User> = getRepository(User);
      const id = Number(req.params.id);

      let user;
      user = await userRepository.findOneOrFail(id);
      if (!user) {
        return next(new AppError(`User not found with id:${id}`, 404));
      }

      const { firstName, lastName, profilePic } = req.body;

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.profilePic = profilePic || user.profilePic;

      // //Validade if the parameters are ok
      const errors = await validate(user);
      if (errors.length > 0) {
        return next(new AppError(errors.join("\n"), 400));
      }

      let result = await userRepository.save(user);
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  );

  static deleteAccount = withTryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      return res.status(200).send("OK");
    }
  );

  static getByEmail = withTryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.query.email) {
        return res.status(200).send("OK");
      }
      next();
    }
  );

  static search = withTryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.query.keyword) {
        return res.status(200).send("OK");
      }
      next();
    }
  );
}
