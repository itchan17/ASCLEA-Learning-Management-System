// Sample argument: 2025-09-10 17:39:20
export const getElapsedTime = (start, end) => {
    const diffInSeconds = (new Date(end) - new Date(start)) / 1000;

    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = Math.floor(diffInSeconds % 60);

    return { hours, minutes, seconds };
};
