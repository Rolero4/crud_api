import express from "express";
import {
    addProductController,
    deleteProductByIdController,
    getAllProductsController,
    getProductByIdController,
    updateProductByIdController,
} from "../../controllers/product.controller";
import { validateBody } from "../../middleware/bodyValidator";
import { productSchema } from "../../schemas/product.schema";

export default (router: express.Router) => {
    /**
     * @openapi
     * /products:
     *   post:
     *     summary: Add a new product
     *     description: Add a new product
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Product'
     *     responses:
     *       200:
     *         description: Successfully added product
     *       500:
     *         description: Internal server error
     *     tags:
     *       - Products
     *
     *   get:
     *     summary: Get all products
     *     description: Retrieve all products
     *     responses:
     *       200:
     *         description: Successfully retrieved products
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     *       500:
     *         description: Internal server error
     *     tags:
     *       - Products
     *
     * /products/{id}:
     *   get:
     *     summary: Get product by Id
     *     description: Retrieve product by Id
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successfully retrieved product
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       500:
     *         description: Internal server error
     *     tags:
     *       - Products
     *
     *   put:
     *     summary: Update product by Id
     *     description: Update product by Id
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Product'
     *     responses:
     *       200:
     *         description: Successfully updated product
     *       500:
     *         description: Internal server error
     *     tags:
     *       - Products
     *
     *   delete:
     *     summary: Delete product by Id
     *     description: Delete product by Id
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successfully deleted product
     *       500:
     *         description: Internal server error
     *     tags:
     *       - Products
     */

    router.post("/products", validateBody(productSchema), addProductController);

    router.get("/products", getAllProductsController);

    router.get("/products/:id", getProductByIdController);

    router.put(
        "/products/:id",
        validateBody(productSchema),
        updateProductByIdController
    );

    router.delete("/products/:id", deleteProductByIdController);
};
