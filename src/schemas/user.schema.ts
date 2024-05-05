import z from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     AddProductSchema:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The Id of the product.
 *       required:
 *         - productId
 */

export const AddProductToUserSchema = z.object({
    productId: z.string(),
});
