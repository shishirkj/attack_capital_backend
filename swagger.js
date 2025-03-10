import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Attack Capital API Documentation",
            version: "1.0.0",
            description: "API documentation for the Attack Capital backend",
        },
        servers: [{ url: "http://localhost:4000" }],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Signup: {
                    type: "object",
                    required: ["email", "password", "username"], // Updated required fields
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            description: "User email address",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            description: "User password (must meet strength requirements)",
                        },
                        username: {
                            type: "string",
                            description: "Unique username for the user", // New field added
                        },
                    },
                },
                Login: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                        },
                        password: {
                            type: "string",
                            format: "password",
                        },
                    },
                },
                Post: {
                    type: "object",
                    required: ["title", "content"],
                    properties: {
                        title: {
                            type: "string",
                            description: "Title of the post",
                        },
                        content: {
                            type: "string",
                            description: "Content of the post",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
export const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger Docs available at: http://localhost:4000/api-docs");
};
