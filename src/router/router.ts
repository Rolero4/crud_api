import express from "express";
import products from "./routes/products";
import auth from "./routes/auth";
import users from "./routes/users";

const router = express.Router();

export default (): express.Router => {
    auth(router);
    users(router);
    products(router);

    return router;
};
