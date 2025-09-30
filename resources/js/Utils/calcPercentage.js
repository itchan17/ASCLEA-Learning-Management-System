export const calcPercentage = (part, total, decimal = 0) => {
    if (total === 0) return 0;

    return Number((part / total) * 100).toFixed(decimal);
};
