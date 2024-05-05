import { NextFunction, Request, Response } from "express";
import { getUserBySessionToken } from "../db/users.db";
import { merge } from "lodash";

export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const sessionToken = req.cookies["TOKEN"];

        if (!sessionToken) return res.sendStatus(401);

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) return res.sendStatus(401);

        merge(req, { identity: existingUser });

        return next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};
