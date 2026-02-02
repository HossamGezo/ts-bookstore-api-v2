import { z } from "zod";

const BaseQuerySchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, { message: "Page number must be a number" })
    .transform(Number)
    .optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
});

export const BookQuerySchema = BaseQuerySchema.extend({
  minPrice: z
    .string()
    .regex(/^\d+$/, { message: "Minimum Price must be a number" })
    .transform(Number)
    .optional(),
  maxPrice: z
    .string()
    .regex(/^\d+$/, { message: "Maximum Price must be a number" })
    .transform(Number)
    .optional(),
});

export const AuthorQuerySchema = BaseQuerySchema;
export const UserQuerySchema = BaseQuerySchema;

export type BookQueryDto = z.infer<typeof BookQuerySchema>;
export type AuthorQueryDto = z.infer<typeof AuthorQuerySchema>;
export type UserQueryDto = z.infer<typeof UserQuerySchema>;
