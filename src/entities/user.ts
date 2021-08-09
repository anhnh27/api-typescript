import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ length: 500 })
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    profilePic: string;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    isPasswordCorrect(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}