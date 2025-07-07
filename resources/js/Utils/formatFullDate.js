export function formatFullDate(input) {
    const fullDate = new Date(input);

    const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
    };

    // sample output: July 17 at 11:59 PM
    const formatted = new Intl.DateTimeFormat("en-US", options).format(
        fullDate
    );

    return formatted;
}
