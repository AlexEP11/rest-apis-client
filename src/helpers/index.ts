export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
    }).format(amount);
};

export const toBoolean = (str: string) => {
    return str.toLowerCase() === "true";
};
