import { Request, Response } from "express";
import { getUserById, getUsers } from "../db/users.db";
import { getProductById } from "../db/product.db";

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getUsers().select("-__v -products");

        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};

export const addProductToUserController = async (
    req: Request,
    res: Response
) => {
    try {
        const { productId } = req.body;
        const { userId } = req.params;

        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const product = await getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (user.products.includes(product._id)) {
            return res
                .status(409)
                .json({ error: "Product already exists in user list" });
        }

        user.products.push(product._id);

        await user.save();

        return res.status(200).json(user.products).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};

export const getUserProducts = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400);
        }

        const products = await getUserById(userId)
            .select("-_id products")
            .populate({
                path: "products",
                select: "_id name quantity price",
            });

        return res.status(200).json(products?.products).end();
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
};
