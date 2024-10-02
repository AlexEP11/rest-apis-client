import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import { getProducts, updateProductAvailability } from "../services/ProductService";
import { Product } from "../types";
import ProductDetails from "../components/ProductDetails";

export async function loader() {
    const products = await getProducts();
    return products;
}

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    await updateProductAvailability(+data.id);

    return {};
}

export default function Products() {
    const products = useLoaderData() as Product[];

    return (
        <>
            <div className="flex flex-col items-center text-center gap-5 md:flex-row md:justify-between ">
                <h2 className="text-4xl text-slate-500 font-extrabold">Productos</h2>
                <Link
                    to={"/productos/nuevo"}
                    className="bg-indigo-600 p-3 rounded-md text-white font-bold shadow-sm text-sm hover:bg-indigo-700 hover:scale-105 duration-300  mt-2  md:m-0"
                >
                    Agregar Producto
                </Link>
            </div>

            <div className="p-2 overflow-x-auto ">
                <table className="w-full mt-5 table-auto ">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <ProductDetails key={product.id} product={product} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
