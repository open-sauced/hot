import dayjs from "dayjs/esm/index.js";
import relativeTime from "dayjs/esm/plugin/relativeTime";

dayjs.extend(relativeTime);

const getDateFromNow = (dateString: string, suffix?: boolean) => {
  const dateSuffix = typeof suffix !== "undefined" ? suffix : false;

  return dateSuffix ? dayjs(dateString).fromNow(true) : dayjs(dateString).fromNow();
};

export default getDateFromNow;
