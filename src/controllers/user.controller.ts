import { NextFunction, Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entities/user";

export default class UserController {

    static register = async (req: Request, res: Response) => {
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

        try {
            let result = await userRepository.save(user);
            return res.status(200).json({
                ok: true,
                status: 200,
                message: "OK",
                data: result
            });
        } catch (ex) {
            return res.status(200).json({
                ok: false,
                status: 200,
                message: ex.code,
                data: null
            });
        }
    }

    static updateProfile = async (req: Request, res: Response) => {
        const userRepository: Repository<User> = getRepository(User);
        const id = Number(req.params.id);

        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).send("User not found");
        }

        const { firstName, lastName, profilePic } = req.body;

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.profilePic = profilePic || user.profilePic;

        // //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }

        try {
            let result = await userRepository.save(user);
            return res.status(200).json({
                ok: true,
                status: 200,
                message: "OK",
                data: result
            });
        } catch (ex) {
            return res.status(200).json({
                ok: false,
                status: 200,
                message: ex.code,
                data: null
            });
        }
    }

    static deleteAccount = async (req: Request, res: Response) => {
        return res.status(200).send("OK");
    }

    static getByEmail = async (req: Request, res: Response, next: NextFunction) => {
        if (req.query.email) {
            return res.status(200).send("OK");
        }
        next();
    }

    static search = async (req: Request, res: Response, next: NextFunction) => {
        if (req.query.keyword) {
            return res.status(200).send("OK");
        }
        next();
    }
}