// --- Libraries
import express from "express";

// --- Middlewares
import {upload} from "../middlewares/upload.middleware.js";

// --- Upload Image Controller Methods (Verbs)
import {uploadImage} from "../controllers/upload.controller.js";

// --- Router
const UploadRouter = express.Router();

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload an image
 *     description: Upload a single image file (JPG, PNG, etc.) to the server. The file is saved in the public/images directory. Maximum file size allowed is 2MB. Access is public.
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload.
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleUploadResponse'
 *       400:
 *         description: Bad Request (No file provided or unsupported format).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
UploadRouter.route("/").post(upload.single("image"), uploadImage);

export default UploadRouter;
