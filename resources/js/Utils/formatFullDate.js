export function formatFullDate(input) {
    if (input) {
        const fullDate = new Date(input);

        const options = {
            month: "long",
            day: "numeric",
            year: "numeric",
        };

        // sample output: March 29, 2025
        const formatted = new Intl.DateTimeFormat("en-US", options).format(
            fullDate
        );

        return formatted;
    }
}
