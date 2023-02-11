export const getMemberCoverPhotoResponse = (data) => {
  if (data?.[0]?.requested_datetime) {
    return `Request sent`;
  } else if (data?.[0]?.rejected_datetime) {
    return `Photo request rejected`;
  } else if (data?.[0]?.accepted_datetime) {
    return ``;
  } else {
    return `Send request to view photo`;
  }
};

export const getMemberHoroscopeResponse = (data) => {
  if (data?.[0]?.requested_datetime) {
    return `Horoscope request sent`;
  } else if (data?.[0]?.rejected_datetime) {
    return `Horoscope request rejected`;
  } else if (data?.[0]?.accepted_datetime) {
    return ``;
  } else {
    return `Send request to view horoscope`;
  }
};
