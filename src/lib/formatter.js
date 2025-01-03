const currencyFormatter = new Intl.NumberFormat("en-US", {
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0,
});

export function formatCurrency(amount){
    return currencyFormatter.format(amount);
}

const numberFormatter = new Intl.NumberFormat("en-US");

export function formatNumber(number){
    return numberFormatter.format(number);
}