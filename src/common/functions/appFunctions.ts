import { NotificationManager } from "react-notifications";
import { AcceptedFileTypes } from "common/variables";

export const createNotification = (type: string, message: string) => {
  switch (type) {
    case "success":
      NotificationManager.success(message, "Success");
      break;
    case "error":
      NotificationManager.error(message, "Something went wrong");
      break;
    case "info":
      NotificationManager.info(message, "Notification");
      break;
  }
};

export const checkInputFile = (file: Blob) => {
  if (
    file.type.includes(AcceptedFileTypes.jpeg) ||
    file.type.includes(AcceptedFileTypes.png)
  ) {
    createNotification("success", "File is uploaded");
    return true;
  } else {
    createNotification(
      "error",
      "Incorrect file type. Should be jpeg, jpg or png."
    );
    return false;
  }
};
