import express from "express";
import products from "./routes/products";
import auth from "./routes/auth";

const router = express.Router();

export default (): express.Router => {
    auth(router);
    products(router);

    return router;
};
