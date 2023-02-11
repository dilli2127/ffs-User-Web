import { message as antdMessage } from "antd";

export function showNotification({ type, message, duration = 3 }) {
  switch (type) {
    case "success":
      antdMessage.success(message, duration);
      break;
    case "warn":
      antdMessage.warning(message, duration);
      break;
    case "error":
      antdMessage.error(message, duration);
      break;
    default:
      antdMessage.info(message, duration);
  }
}
