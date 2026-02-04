import {z} from "zod";

const BaseQuerySchema = z.object({
  page: z
    .string()
    .trim()
    .regex(/^\d+$/, {message: "Page number must be a number"})
    .transform(Number)
    .optional(),
  search: z.string().trim().optional(),
  sortBy: z.string().trim().optional(),
});

export const BookQuerySchema = BaseQuerySchema.extend({
  minPrice: z
    .string()
    .trim()
    .regex(/^\d+$/, {message: "Minimum Price must be a number"})
    .transform(Number)
    .optional(),
  maxPrice: z
    .string()
    .trim()
    .regex(/^\d+$/, {message: "Maximum Price must be a number"})
    .transform(Number)
    .optional(),
});

export const AuthorQuerySchema = BaseQuerySchema;
export const UserQuerySchema = BaseQuerySchema;

export type BookQueryDto = z.infer<typeof BookQuerySchema>;
export type AuthorQueryDto = z.infer<typeof AuthorQuerySchema>;
export type UserQueryDto = z.infer<typeof UserQuerySchema>;
