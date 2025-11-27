import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export function formatTime(time) {
    return dayjs(time, "HH:mm").format("h:mm A"); // Sample Output: 23:00 -> 11:00 PM
}
