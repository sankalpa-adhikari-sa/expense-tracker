import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const dateFilterOptions = (
  dateRange: { from: Date; to: Date; selected: string },
  colName: string
) => {
  const fromDate = dateRange.from
    ? format(
        utcToZonedTime(format(dateRange.from, "yyyy-MM-dd 00:00:00"), "UTC"),
        "yyyy-MM-dd HH:mm:ss"
      )
    : undefined;

  const toDate = dateRange.to
    ? format(
        utcToZonedTime(format(dateRange.to, "yyyy-MM-dd 23:59:59"), "UTC"),
        "yyyy-MM-dd HH:mm:ss"
      )
    : undefined;
  if (fromDate && toDate) {
    return `${colName} >= "${fromDate}" && ${colName} <= "${toDate}"`;
  } else if (fromDate) {
    return `${colName} >= "${fromDate}" && ${colName} <= "${format(
      utcToZonedTime(format(dateRange.from, "yyyy-MM-dd 23:59:59"), "UTC"),
      "yyyy-MM-dd HH:mm:ss"
    )}"`;
  } else if (toDate) {
    return `${colName} >= "${format(
      utcToZonedTime(format(dateRange.to, "yyyy-MM-dd 00:00:00"), "UTC"),
      "yyyy-MM-dd HH:mm:ss"
    )}" && ${colName} <= "${toDate}"`;
  } else {
    return "";
  }
};
