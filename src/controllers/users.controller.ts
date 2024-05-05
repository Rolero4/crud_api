import { Request, Response } from "express";
import { getUsers } from "../db/users.db";

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getUsers().select("-__v -products");

        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};
