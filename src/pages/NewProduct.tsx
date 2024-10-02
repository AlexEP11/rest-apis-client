import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error = "";
    if (Object.values(data).includes("")) {
        error = "Todos los campos son obligatorios";
    }

    if (error.length) {
        return error;
    }

    addProduct(data);

    return redirect("/");
}
export default function NewProduct() {
    const error = useActionData() as string;

    return (
        <>
            <div className="flex flex-col items-center text-center gap-5 md:flex-row md:justify-between ">
                <h2 className="text-4xl text-slate-500 font-extrabold">Registrar Producto</h2>
                <Link
                    to={"/"}
                    className="bg-indigo-600 p-3 rounded-md text-white font-bold shadow-sm text-sm hover:bg-indigo-700 hover:scale-105 duration-300 mt-2 md:m-0"
                >
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form className="mt-10" method="POST">
                <ProductForm />

                <input
                    type="submit"
                    className="bg-green-500 w-full p-2 shadow-sm rounded-md mt-5 text-white text-lg cursor-pointer font-bold hover:scale-105 duration-300"
                    value="Registar Producto"
                />
            </Form>
        </>
    );
}
