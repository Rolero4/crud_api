/**
 * @openapi
 * components:
 *  schemas:
 *      ProductSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Product Name
 *         quantity:
 *           type: number
 *           description: Product Quantity
 *         price:
 *           type: number
 *           description: Product Price
 *         image:
 *           type: string
 *           description: Product Image URL
 *         required:
 *          - name
 *          - quantity
 *          - price
 */

import z from "zod";

export const productSchema = z.object({
    name: z.string(),
    quantity: z.number().int(),
    price: z.number(),
    image: z.string().optional(),
});
