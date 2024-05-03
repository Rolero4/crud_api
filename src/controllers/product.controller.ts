import {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
} from "../db/product.db";

import { Response, Request } from "express";

export const addProductController = async (req: Request, res: Response) => {
    try {
        const product = await createProduct(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getAllProductsController = async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getProductByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const updateProductByIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;

        const product = await updateProductById;

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await getProductById(id);

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deleteProductByIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;

        const product = await deleteProductById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
