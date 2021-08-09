import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entities/user";

export class CreateUser1628521908286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let user = new User();
        user.email = "alex.nguyen@gmail.com";
        user.password = "abcde12345-";
        user.firstName = "Alex";
        user.lastName = "Nguyen";
        user.hashPassword();
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
