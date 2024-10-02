import { InferOutput } from "valibot";
import { ProductSchema } from "../schemas/products-schemas";

export type Product = InferOutput<typeof ProductSchema>;
