import { Response, Request } from "express";
import { authentication, random } from "../middleware/crypto";
import { createUser, getUserByEmail } from "../db/users.db";

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.sendStatus(400);

        const user = await getUserByEmail(email).select(
            "+authentication.salt +authentication.password"
        );

        if (!user) {
            return res
                .sendStatus(400)
                .json({ error: "User with that email does not exist" });
        }

        if (!user.authentication || !user.authentication.salt) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();

        user.authentication.sessionToken = authentication(
            salt,
            user._id.toString()
        );

        await user.save();

        res.cookie("TOKEN", user.authentication.sessionToken, {
            domain: "localhost",
            path: "/",
        });

        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};

export const registerController = async (req: Request, res: Response) => {
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
