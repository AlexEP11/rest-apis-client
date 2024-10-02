import { safeParse } from "valibot";
import { DraftProductSchema, ProductSchema, ProductsSchema } from "../schemas/products-schemas";
import axios from "axios";
import { Product } from "../types";
import { toBoolean } from "../helpers";

type ProductData = {
    [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price,
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            const { data } = await axios.post(url, {
                name: result.output.name,
                price: result.output.price,
            });
        } else {
            throw new Error("Datos no válidos");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios.get(url);
        const result = safeParse(ProductsSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error("Ocurrio un error al recuperar los productos");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getProductsById(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios.get(url);
        const result = safeParse(ProductSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error("Ocurrio un error al recupera el producto");
        }
    } catch (error) {}
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
    try {
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: Number(data.price),
            availability: toBoolean(data.availability.toString()),
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url, result.output);
        } else {
            throw new Error("Ocurrio un error al editar el producto");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProdcut(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.log(error);
    }
}

export async function updateProductAvailability(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url);
    } catch (error) {
        console.log(error);
    }
}
