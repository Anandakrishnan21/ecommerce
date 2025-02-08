const currencyFormatter = new Intl.NumberFormat("en-US", {
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-CA")

export function formatCurrency(amount){
    return currencyFormatter.format(amount);
}

const numberFormatter = new Intl.NumberFormat("en-US");

export function formatNumber(number){
    return numberFormatter.format(number);
}

export function formatDate(date){
    return dateFormatter.format(date);
}