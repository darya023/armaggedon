import dayjs from "dayjs";

require(`dayjs/locale/ru`);
dayjs.locale(`ru`);

export const humanizeDate = (date, format) => {
  return dayjs(date).format(format);
};
