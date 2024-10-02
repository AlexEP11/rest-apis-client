import { Product } from "../types";

type ProductFormProps = {
    product?: Product;
};

export default function ProductForm({ product }: ProductFormProps) {
    return (
        <>
            <div className="mb-4">
                <label htmlFor="name" className="text-gray-500  ">
                    Nombre Producto:
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-2 block w-full p-3 bg-gray-50 border focus:outline-none"
                    placeholder="Nombre del Producto"
                    defaultValue={product?.name}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="text-gray-500  ">
                    Precio:
                </label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    className="mt-2 block w-full p-3 bg-gray-50 border focus:outline-none"
                    placeholder="Precio del Producto"
                    defaultValue={product?.price}
                />
            </div>
        </>
    );
}
