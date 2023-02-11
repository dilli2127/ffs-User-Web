import { IMAGE_URL } from "./constants";

export function getProfileUrl(url, member_gender) {
  if (url && member_gender) {
    return `${IMAGE_URL}${url}`;
  } else if (member_gender === "f" && !url) {
    return "https://cdn.standardmatrimony.com/female-avatar.png";
  } else if (member_gender === "m" && !url) {
    return "https://cdn.standardmatrimony.com/male-avatar.png";
  }
}
