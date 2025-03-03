import { parseISO, format } from "date-fns";

/**
 * DateFormatter component
 * Formats a date string into a human-readable format
 */
type Props = {
  dateString: string;  // ISO date string
};

const DateFormatter = ({ dateString }: Props) => {
  // Parse the ISO date string into a Date object
  const date = parseISO(dateString);
  // Format the date using date-fns (e.g., "January 1, 2025")
  return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
};

export default DateFormatter;