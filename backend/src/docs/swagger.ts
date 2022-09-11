import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Taskify API documentation",
    version: "1.0.0",
    description:
      "Taskify backend api, this is the main docs for the taskify server api, it contains all the information to connect to the api, all routes and schemas",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        schema: "bearer",
      },
    },
    schemas: {
      createUserSchema: {
        type: "object",
        required: ["firstName", "lastName", "password", "email"],
        properties: {
          firstName: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
          password: {
            type: "string",
          },
          email: {
            type: "string",
          },
        },
      },
      updateUserSchema: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
          email: {
            type: "string",
          },
        },
      },
      getUserByIdSchema: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
        },
      },
      confirmCodeSchema: {
        type: "object",
        required: ["code", "email"],
        properties: {
          code: {
            type: "number",
          },
          email: {
            type: "string",
          },
        },
      },
      createCodeUserSchema: {
        type: "object",
        required: ["email"],
        properties: {
          email: {
            type: "string",
          },
        },
      },
      changeUserPasswordSchema: {
        type: "object",
        required: ["email", "code", "newPassword"],
        properties: {
          email: {
            type: "string",
          },
          code: {
            type: "number",
          },
          newPassword: {
            type: "string",
          },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);