import express from "express";
import { validateBody } from "../../middleware/bodyValidator";
import { UserLoginSchema, UserRegisterSchema } from "../../schemas/auth.schema";
import {
    loginController,
    registerController,
} from "../../controllers/auth.controller";

/**
 * @openapi
 * /auth/register:
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
 *       - Auth
 *
 * /auth/login:
 *   post:
 *     summary: Login a User
 *     description: Logina  User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginSchema'
 *     responses:
 *       200:
 *         description: Successfully login User
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Auth
 */

export default (router: express.Router) => {
    router.post(
        "/auth/register",
        validateBody(UserRegisterSchema),
        registerController
    );

    router.post("/auth/login", validateBody(UserLoginSchema), loginController);
};
