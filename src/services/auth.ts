import { v4 as uuid } from 'uuid';

type User = {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    profilePic: string,
    password?: string
}

const users = [
    {
        id: uuid(),
        firstName: "Alex",
        lastName: "Nguyen",
        email: "admin",
        profilePic: 'https://qikify-cdn.nyc3.cdn.digitaloceanspaces.com/production/mobilemenu/instances/24013/385abfddbcf83e0f3b615c5c1bf6babfaa6eab55425ce9852b5b7e74b0d0b0d8.jpeg',
        password: 'admin'
    }
]

export const login = async (email: string, password: string) => {
    const user = users.find(u => u.email === email) as User;
    let res;
    if (!user || user.password !== password) {
        res = {
            ok: false,
            status: 404,
            message: "Invalid credentials",
            data: null
        };

        return res;
    }

    res = {
        ok: true,
        status: 200,
        message: "OK",
        data: user
    };
    return res;
}

export const logout = () => {
    const res = {
        ok: true,
        status: 200,
        message: "OK",
        data: null
    };
    return res;
}