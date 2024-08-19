import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const formatDate = (date: string) => {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
};

export default formatDate;
