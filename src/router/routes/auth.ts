import express from "express";
import { validateData } from "../../middleware/validator";
import { UserRegisterSchema } from "../../schemas/user.schema";
import { registerUser } from "../../controllers/auth.controller";

/**
 * @openapi
 * /auth:
 *   post:
 *     summary: Register new User
 *     description: Register new User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegisterSchema'
 *     responses:
 *       200:
 *         description: Successfully registred User
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Users
 */

export default (router: express.Router) => {
    router.post("/auth", validateData(UserRegisterSchema), registerUser);
};
