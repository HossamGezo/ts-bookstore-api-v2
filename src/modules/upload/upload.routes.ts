// --- Libraries
import express from "express";

// --- Middlewares
import { upload } from "../../shared/middlewares/upload.middleware.js";

// --- Upload Image Controller Methods (Verbs)
import { uploadImage } from "./upload.controller.js";

// --- Router
const UploadRouter = express.Router();

// --- /api/upload
UploadRouter.route("/").post(upload.single("image"), uploadImage);

export default UploadRouter;
