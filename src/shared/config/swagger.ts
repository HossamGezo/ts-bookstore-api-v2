import swaggerJsdoc, { type Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API",
      description:
        "A professional RESTful API for a Bookstore built with Node.js, Express, and TypeScript.",
      version: "2.0.0",
      contact: {
        name: "Hossam",
      },
    },
    servers: [
      {
        url: "https://bookstore-api-0fy2.onrender.com",
        description: "Production server",
      },
      {
        url: "http://localhost:5001",
        description: "Development server",
      },
    ],
    tags: [
      { name: "Auth", description: "Authentication operations" },
      {
        name: "Password",
        description: "Password recovery (MVC Views & Logic)",
      },
      { name: "Book", description: "Book catalog management" },
      { name: "Author", description: "Author details and profiles" },
      { name: "User", description: "User profile and administration" },
      { name: "Upload", description: "File and image upload services" },
    ],
    components: {
      securitySchemes: {
        tokenAuth: {
          type: "apiKey",
          in: "header",
          name: "token",
          description: "Enter your JWT token",
        },
      },
      schemas: {
        // --- Error Schemas ---
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            statusCode: { type: "number", example: 400 },
            message: { type: "string", example: "Error message here" },
          },
        },
        ErrorUnauthorizedResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            statusCode: { type: "number", example: 401 },
            message: {
              type: "string",
              example: "No token provided or invalid token",
            },
          },
        },
        ErrorForbiddenResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            statusCode: { type: "number", example: 403 },
            message: { type: "string", example: "Access denied. Admins only." },
          },
        },
        ErrorNotFoundResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            statusCode: { type: "number", example: 404 },
            message: { type: "string", example: "Resource not found" },
          },
        },
        // --- Delete Schemas ---
        DeleteSuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Deleted successfully",
                },
              },
            },
          },
        },
        // --- User Schemas ---
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "6988bef57344126984f32fd6" },
            userName: { type: "string", example: "John Doe" },
            email: { type: "string", example: "johndoe@gmail.com" },
            isAdmin: { type: "boolean", example: false },
            token: { type: "string", example: "eyJhbGci..." },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["userName", "email", "password", "confirmPassword"],
          properties: {
            userName: { type: "string", example: "johndoe" },
            email: { type: "string", example: "johndoe@gmail.com" },
            password: { type: "string", example: "Password@123" },
            confirmPassword: { type: "string", example: "Password@123" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "johndoe@gmail.com" },
            password: { type: "string", example: "Password@123" },
          },
        },
        SuccessUsersList: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                items: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" },
                },
                totalItems: { type: "integer", example: 10 },
                currentPage: { type: "integer", example: 1 },
                totalPages: { type: "integer", example: 2 },
              },
            },
          },
        },
        SingleUserResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { $ref: "#/components/schemas/User" },
          },
        },
        UserUpdateRequest: {
          type: "object",
          properties: {
            userName: { type: "string", example: "johndoe_updated" },
            email: { type: "string", example: "john_new@gmail.com" },
            password: { type: "string", example: "NewPassword@123" },
          },
        },
        // --- Author Schemas ---
        Author: {
          type: "object",
          properties: {
            id: { type: "string", example: "6988bef57344126984f32fd6" },
            firstName: { type: "string", example: "John" },
            lastName: { type: "string", example: "Doe" },
            nationality: { type: "string", example: "Egyptian" },
            image: { type: "string", example: "image-path.jpg" },
          },
        },
        AuthorRequest: {
          type: "object",
          required: ["firstName", "lastName", "nationality"],
          properties: {
            firstName: { type: "string", example: "Naguib" },
            lastName: { type: "string", example: "Mahfouz" },
            nationality: { type: "string", example: "Egyptian" },
            image: { type: "string", example: "default-image.png" },
          },
        },
        SuccessAuthorsList: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                items: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Author" },
                },
                totalItems: { type: "integer", example: 50 },
                currentPage: { type: "integer", example: 1 },
                totalPages: { type: "integer", example: 5 },
              },
            },
          },
        },
        SingleAuthorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { $ref: "#/components/schemas/Author" },
          },
        },
        // --- Book Schemas ---
        Book: {
          type: "object",
          properties: {
            id: { type: "string", example: "6988bef57344126984f32fd6" },
            title: { type: "string", example: "The Palace Walk" },
            description: {
              type: "string",
              example: "A great novel by Naguib Mahfouz",
            },
            authorName: { type: "string", example: "Naguib Mahfouz" },
            price: { type: "number", example: 25.5 },
            authorId: { $ref: "#/components/schemas/Author" },
            cover: {
              type: "string",
              enum: ["soft cover", "hard cover"],
              example: "soft cover",
            },
          },
        },
        BookRequest: {
          type: "object",
          required: [
            "title",
            "authorName",
            "authorId",
            "description",
            "price",
            "cover",
          ],
          properties: {
            title: { type: "string", example: "The Palace Walk" },
            authorName: { type: "string", example: "Naguib Mahfouz" },
            authorId: { type: "string", example: "6988bef57344126984f32fd6" },
            description: { type: "string", example: "Book description..." },
            price: { type: "number", example: 25.5 },
            cover: {
              type: "string",
              example: "soft cover",
              enum: ["soft cover", "hard cover"],
            },
          },
        },
        SuccessBooksList: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                items: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Book" },
                },
                totalItems: { type: "integer", example: 100 },
                currentPage: { type: "integer", example: 1 },
                totalPages: { type: "integer", example: 10 },
              },
            },
          },
        },
        SingleBookResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { $ref: "#/components/schemas/Book" },
          },
        },
        // --- Upload Schemas ---
        SingleUploadResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Image Uploaded Successfully",
                },
                filename: {
                  type: "string",
                  example: "2026-02-04T22-21-44-filename.png",
                },
                path: {
                  type: "string",
                  example: "/images/2026-02-04T22-21-44-filename.png",
                },
              },
            },
          },
        },
        // --- Password Schemas ---
        ForgotPasswordRequest: {
          type: "object",
          required: ["email"],
          properties: {
            email: { type: "string", example: "johndoe@gmail.com" },
          },
        },
        ResetPasswordRequest: {
          type: "object",
          required: ["password", "confirmPassword"],
          properties: {
            password: { type: "string", example: "NewPassword@123" },
            confirmPassword: { type: "string", example: "NewPassword@123" },
          },
        },
      },
      responses: {
        // --- Error Responses ---
        BadRequestError: {
          description: "Bad Request - Validation failed or invalid data",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        UnauthorizedError: {
          description: "Unauthorized - No token provided or invalid token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorUnauthorizedResponse",
              },
            },
          },
        },
        ForbiddenError: {
          description: "Forbidden - Admin access required",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorForbiddenResponse" },
            },
          },
        },
        NotFoundError: {
          description: "Not Found - The requested resource does not exist",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorNotFoundResponse" },
            },
          },
        },
        // --- Password Responses ---
        InternalServerError: {
          description:
            "Internal Server Error - Something went wrong on the server (e.g., email sending failed)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        // --- Delete Responses --
        DeleteSuccess: {
          description: "Success - The item has been deleted",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DeleteSuccessResponse" },
            },
          },
        },
      },
    },
  },
  apis: ["./src/modules/**/*.swagger.yaml", "./src/modules/**/*.swagger.yml"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
