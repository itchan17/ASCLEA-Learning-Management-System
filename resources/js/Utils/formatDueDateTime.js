export function formatDueDateTime(input) {
    const date = new Date(input);

    const options = {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };

    // sample output: July 17 at 11:59 PM
    const formatted = new Intl.DateTimeFormat("en-US", options).format(date);

    return formatted;
}
