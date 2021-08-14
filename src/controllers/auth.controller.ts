import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entities/user";
import { JWT_SECRET } from "../common/constants";

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send();
    }

    //Get user from database
    const userRepository = getRepository(User);
    let user: User = new User();
    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (ex) {
      return res.status(400).json({
        ok: false,
        message: "USER_NOT_FOUND",
      });
    }

    //Check if encrypted password match
    if (!user.isPasswordCorrect(password)) {
      return res.status(401).json({
        ok: false,
        message: "INVALID_PASSWORD",
      });
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    //Send the jwt in the response
    res.send(token);
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User = new User();
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.isPasswordCorrect(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;
