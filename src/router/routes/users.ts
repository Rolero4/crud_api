import express from "express";
import { getAllUsersController } from "../../controllers/users.controller";
import { isAuthenticated } from "../../middleware/authValidator";

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
 */

export default (router: express.Router) => {
    router.get("/users", isAuthenticated, getAllUsersController);
};
