// Example output
// "95.00" -> 95
// 89.5 -> 89.5

export const cleanDecimal = (number) => {
    const num = parseFloat(number);
    if (isNaN(num)) return "";

    return Number(number) % 1 === 0 ? parseInt(number) : Number(number);
};
