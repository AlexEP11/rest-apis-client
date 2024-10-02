import {
    Link,
    Form,
    useActionData,
    ActionFunctionArgs,
    redirect,
    LoaderFunctionArgs,
    useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductsById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const product = await getProductsById(+params.id);
        if (!product) {
            return redirect("/");
        }
        return product;
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error = "";
    if (Object.values(data).includes("")) {
        error = "Todos los campos son obligatorios";
    }

    if (error.length) {
        return error;
    }

    if (params.id !== undefined) {
        await updateProduct(data, +params.id);
    }

    return redirect("/");
}

const availabilityOptions = [
    { name: "Disponible", value: true },
    { name: "No Disponible", value: false },
];

export default function EditProduct() {
    const error = useActionData() as string;
    const product = useLoaderData() as Product; // Obtiene info del loader

    return (
        <>
            <div className="flex flex-col items-center text-center gap-5 md:flex-row md:justify-between ">
                <h2 className="text-4xl text-slate-500 font-extrabold">Editar Producto</h2>
                <Link
                    to={"/"}
                    className="bg-indigo-600 p-3 rounded-md text-white font-bold shadow-sm text-sm hover:bg-indigo-700 hover:scale-105 duration-300 mt-2 md:m-0"
                >
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form className="mt-10" method="POST">
                <ProductForm product={product} />

                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="availability">
                        Disponibilidad:
                    </label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map((option) => (
                            <option key={option.name} value={option.value.toString()}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-2 shadow-sm rounded-md mt-5 text-white text-lg cursor-pointer font-bold hover:scale-105 duration-300"
                    value="Guardar Cambios"
                />
            </Form>
        </>
    );
}
