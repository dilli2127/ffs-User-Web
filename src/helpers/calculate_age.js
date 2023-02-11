import moment from "moment";

export const CalculateAge = (dob) => {
  let age = moment().diff(dob, "years");

  return age ? `${age} Yrs old` : "";
};

export const LastSeen = (date_time) => {
  let last_seen = moment.utc(date_time).local().startOf("seconds").fromNow();
  last_seen = last_seen
    .replace(" an", "1")
    .replace("an hour", "1H")
    .replace(" minutes", "mins")
    .replace(" minute", "min")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace("a month", "1m")
    .replace("months", "m")
    .replace(" years", "y")
    .replace(" year", "y")
    .replace("Invalid date", "-");

  if (
    moment
      .utc(date_time)
      .local()
      .startOf("seconds")
      .fromNow()
      .indexOf("minutes") > 0
  ) {
    last_seen = "online";
  }

  return last_seen;
};

export const LastSeenNotification = (date_time) => {
  let last_seen = moment.utc(date_time).local().startOf("seconds").fromNow();
  last_seen = last_seen
    .replace(" an", "1")
    .replace(" minutes", "mins")
    .replace("minute", "min")
    .replace(" hours", "h")
    // .replace(" hour", "h")
    .replace("an hour", "1h")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace("month", "m")
    .replace("months", "m")
    .replace(" years", "y")
    .replace(" year", "y")
    .replace("Invalid date", "-");

  return last_seen;
};
