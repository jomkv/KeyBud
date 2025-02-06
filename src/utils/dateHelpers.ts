import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const formatDate = (date: string) => {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
};

const isWithinPast30Days = (rawDate: string) => {
  const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const date = new Date(rawDate);

  return date > THIRTY_DAYS_AGO;
};

const getCooldownInDays = (rawDate: string) => {
  const date = new Date(rawDate);

  const pastDate = dayjs(date);
  const targetDate = pastDate.add(30, "day");
  const now = dayjs();

  return targetDate.diff(now, "day");
};

export default formatDate;
export { isWithinPast30Days, getCooldownInDays };
