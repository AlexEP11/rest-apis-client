import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <header className="bg-slate-900">
                <div className="mx-auto max-w-6xl py-10 container">
                    <h1 className="text-center font-extrabold text-4xl text-white">
                        Administrador de Productos
                    </h1>
                </div>
            </header>

            <main className=" mt-10 mx-auto container max-w-6xl px-5">
                <section className="bg-white p-10 shadow-md">
                    <Outlet />
                </section>
            </main>
        </>
    );
}
