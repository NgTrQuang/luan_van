export const formatNumber = (amount, locale = "vi-VN") => {
    // return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    return new Intl.NumberFormat(locale, {
        style: 'currency', 
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
 }
