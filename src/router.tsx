import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {
    loader as productsLoader,
    action as updateAvailabilityAction,
} from "./pages/Products";
import NewProduct, { action as newProductAction } from "./pages/NewProduct";
import EditProduct, {
    loader as editProduct,
    action as updateProductAction,
} from "./pages/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader, // Carga los productos
                action: updateAvailabilityAction,
            },
            {
                path: "productos/nuevo",
                element: <NewProduct />,
                action: newProductAction, // Accion que se ejecuta al mandar el form
            },
            {
                path: "productos/:id/editar",
                element: <EditProduct />,
                loader: editProduct,
                action: updateProductAction,
            },
            {
                path: "productos/:id/eliminar",
                action: deleteProductAction,
            },
        ],
    },
]);
