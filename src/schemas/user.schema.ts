/**
 * @openapi
 * components:
 *   schemas:
 *     UserRegisterSchema:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *       required:
 *         - username
 *         - email
 *         - password
 *
 *     UserLoginSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *       required:
 *         - email
 *         - password
 */

import z from "zod";

export const UserRegisterSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
