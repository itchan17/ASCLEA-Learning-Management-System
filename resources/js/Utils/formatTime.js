import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export function formatTime(time) {
    return dayjs(time, "HH:mm").format("h:mm A");
}
