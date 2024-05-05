import express from "express";
import {
    addProductToUserController,
    getAllUsersController,
} from "../../controllers/users.controller";
import { isAuthenticated } from "../../middleware/authValidator";
import { validateBody } from "../../middleware/bodyValidator";
import { AddProductToUserSchema } from "../../schemas/user.schema";

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Successfully send all Users
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Users
 *
 *
 * /users/{userId}/product:
 *   post:
 *     summary: Add product to user list
 *     description: Add product to user list
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddProductSchema'
 *     responses:
 *       200:
 *         description: Successfully add product to user list
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Users
 */

export default (router: express.Router) => {
    router.get("/users", isAuthenticated, getAllUsersController);

    router.post(
        "/users/:userId/product",
        isAuthenticated,
        validateBody(AddProductToUserSchema),
        addProductToUserController
    );
};
