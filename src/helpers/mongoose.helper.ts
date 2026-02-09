export const globalSchemaPlugin = (schema: any) => {
  const transform = (_doc: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  };
  schema.set("toJSON", { transform });
  schema.set("toObject", { transform });
};
