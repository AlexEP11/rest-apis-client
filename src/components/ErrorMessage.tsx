import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
    return (
        <>
            <div className="w-full bg-red-600 p-3 text-white uppercase text-center rounded-md font-bold mt-5">
                {children}
            </div>
        </>
    );
}
