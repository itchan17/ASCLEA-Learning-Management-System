export function getRemainingDays(dateString, numOfDay) {
    const deletedAt = new Date(dateString);
    const expiryDate = new Date(deletedAt);
    expiryDate.setDate(expiryDate.getDate() + numOfDay); // numOfDay is the inital amount of day before it expirted

    const now = new Date();
    const diffTime = expiryDate - now; // Get the remaining times in ms
    const remaingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days

    return remaingDays;
}
