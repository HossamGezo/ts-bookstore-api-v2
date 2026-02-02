import { Request } from "express";

declare global {
  interface UserPayload {
    id: string;
    isAdmin: boolean;
  }
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
