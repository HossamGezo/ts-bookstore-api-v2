// --- Libraries
import type { Request } from "express";
import multer, { type FileFilterCallback } from "multer";
import path from "path";

// --- Storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(process.cwd(), "public/images"));
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = new Date().toISOString().replace(/:/g, "-");
    const cleanFileName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^\w.-]/g, "");
    cb(null, `${uniqueSuffix}-${cleanFileName}`);
  },
});

// --- File Filter
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format! Please upload an image."));
  }
};

/**
 * @desc Upload middleware
 */
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Maximum 2MB
});
