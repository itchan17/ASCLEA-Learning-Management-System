export const convertDurationMinutes = (durationMinutes) => {
    if (durationMinutes < 60) {
        return `${durationMinutes} ${
            durationMinutes > 2 ? "minutes" : "minute"
        }`;
    }

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return { hours, minutes };
};
