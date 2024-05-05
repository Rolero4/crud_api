import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import router from "./router/router";
import swaggerDocs from "./config/swagger";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

// Validate .env
const PORT = process.env.PORT;

if (!PORT || isNaN(Number(PORT))) {
    console.error("PORT is not defined or is not a valid number");
    process.exit(1);
}

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
    console.error("Mongo URL was not provided");
    process.exit(1);
}

// Initialize Express app
const app = express();

// Enable features
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Connect to MongoDB

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");

        // Start the server
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            app.get("/", (req, res) => {
                res.redirect("/docs");
            });
        });

        // Set up routes
        app.use("/", router());

        //enable swagger
        swaggerDocs(app, PORT);
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });
