import { Model, type PopulateOptions } from "mongoose";

interface QueryOptions {
  page: number;
  limit?: number;
  filter?: any;
  sort?: any;
  populate?: PopulateOptions | PopulateOptions[];
  select?: string;
}

export const queryOperations = async <T>(
  model: Model<T>,
  options: QueryOptions,
) => {
  const {
    page,
    limit = 2,
    filter = {},
    sort = { createdAt: -1 },
    populate,
    select,
  } = options;

  const skip = (page - 1) * limit;

  const [items, totalItems] = await Promise.all([
    model
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate((populate as any) || [])
      .select(select || ""),
    model.countDocuments(filter),
  ]);

  return {
    items,
    totalItems,
    currentPage: page,
    totalPages: Math.ceil(totalItems / limit),
  };
};
