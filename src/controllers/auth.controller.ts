import { Response, Request } from "express";
import { authentication, random } from "../middleware/crypto";
import { createUser, getUserByEmail } from "../db/users.db";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) return res.sendStatus(400);

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res
                .sendStatus(400)
                .json({ error: "User with this email already exists" });
        }

        const salt = random();

        const authPassword = authentication(salt, password);

        if (authPassword === undefined)
            return res
                .sendStatus(400)
                .json({ error: "Error with password validation" });
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authPassword,
            },
        });

        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};
