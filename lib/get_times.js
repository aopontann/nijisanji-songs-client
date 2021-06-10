// タイムゾーンの時間を取得
const { formatToTimeZone } = require("date-fns-timezone");

const TIME_ZONE_TOKYO = "Asia/Tokyo";

module.exports.get_time = (q) => {
  // TIME_ZONE, time_hour_diff, FORMAT
  const query = q || {};
  const TIME_ZONE = query.timezone || "Asia/Tokyo";
  const time = new Date();
  const FORMAT = query.format || "YYYY-MM-DDTHH:mm:ss";
  query.day_diff
    ? time.setHours(time.getDay() + query.day_diff)
    : ""
  query.hour_diff
    ? time.setHours(time.getHours() + query.hour_diff)
    : ""
  const formatted_time = formatToTimeZone(time, FORMAT, {
    timeZone: TIME_ZONE,
  });
  return formatted_time;
};

// JST 2021-05-23T16:22:24Z
module.exports.toUTC = (JST) => {
  const FORMAT = "YYYY-MM-DDTHH:mm:ss";
  const time = Date.parse(JST);
  const date = new Date(time);
  date.setHours(date.getHours() - 9);
  const formatted_time = formatToTimeZone(date, FORMAT, {
    timeZone: "UTC",
  });
  return formatted_time + "Z";
}

module.exports.toJST = (UTC) => {
  const FORMAT = "YYYY-MM-DDTHH:mm:ss";
  const time = Date.parse(UTC);
  const date = new Date(time);
  //date.setHours(date.getHours() + 9);
  const formatted_time = formatToTimeZone(date, FORMAT, {
    timeZone: TIME_ZONE_TOKYO,
  });
  return formatted_time + "Z";
}
