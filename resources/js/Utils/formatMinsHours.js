/**
 * Converts decimal hours into a formatted string showing hours and minutes.
 * Example:
 * 0.5 => "30 mins"
 * 1.25 => "1:15 hrs"
 */
export function formatHours(decimalHours) {
    if (!decimalHours || decimalHours === 0) return "0 mins";

    const totalMinutes = Math.round(decimalHours * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} mins`;
    return `${hours}:${minutes.toString().padStart(2, "0")} hrs`;
}
