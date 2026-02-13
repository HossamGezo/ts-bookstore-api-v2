// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Request } from "express";

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
