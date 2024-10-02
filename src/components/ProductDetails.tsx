import { ActionFunctionArgs, useNavigate, Form, redirect, useFetcher } from "react-router-dom";
import { formatCurrency } from "../helpers";
import { Product } from "../types";
import { deleteProdcut } from "../services/ProductService";
import Swal from "sweetalert2";
import { FormEvent } from "react";

type ProductDetailsProps = {
    product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteProdcut(+params.id);
        return redirect("/");
    }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const isAvailable = product.availability;
    const navigate = useNavigate(); // puede pasar un state a la pagina que ingresa, useLocation para recuperar el state pero no se va usar en este caso, no voy a mandar el state porque la info la sacare con un loader desde la URL

    const fetcher = useFetcher(); // Usas fetcher para manejar el envío del formulario

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
            fetcher.submit(e.target as HTMLFormElement, { method: "post" });
        }
    };
    return (
        <tr className="border-b">
            <td className="p-3 text-center text-lg text-gray-800 font-bold">{product.name}</td>
            <td className="p-3 text-lg text-center text-gray-800 font-bold">
                {formatCurrency(product.price)}
            </td>
            <td>
                <fetcher.Form method="POST" className="items-center justify-center flex">
                    <button
                        name="id"
                        value={product.id}
                        className={`${
                            isAvailable ? "text-green-500" : "text-red-600"
                        } p-3 text-sm text-center font-bold uppercase border border-black-100 w-full rounded-md hover:border-black hover:scale-95 duration-300`}
                    >
                        {isAvailable ? "Disponible" : "No Disponible"}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex flex-col items-center justify-center gap-5 md:flex-row  ">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className="p-2 w-full rounded-md bg-indigo-600 text-center text-white font-bold hover:bg-indigo-700 hover:scale-105 duration-300"
                    >
                        Editar
                    </button>
                    <Form
                        method="POST"
                        action={`productos/${product.id}/eliminar`}
                        onSubmit={handleSubmit}
                        className="flex w-full"
                    >
                        <input
                            type="submit"
                            className="p-2 w-full rounded-md bg-red-600 text-center text-white font-bold hover:bg-red-700 hover:scale-105 duration-300"
                            value="Eliminar"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    );
}
