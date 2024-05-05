import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi, { SwaggerOptions } from "swagger-ui-express";
import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";

const options: SwaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CRUD Swagger",
            version: "1.0.0",
            description: "API documentation generated with Swagger",
        },
        tags: [
            {
                name: "Auth",
                description: "API for users",
            },
            {
                name: "Products",
                description: "API for products",
            },
        ],
    },
    apis: [
        path.resolve(__dirname, "../router/routes/*.ts"),
        path.resolve(__dirname, "../schemas/*.ts"),
    ],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port: string) {
    // Swagger page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get("/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
