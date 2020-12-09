import { ISidebarChatItem } from "./interfaces";
import { AcceptedFileTypes, ChatType } from "./variables";
import { NotificationManager } from "react-notifications";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatLastChatActivityDate = (date: string) => {
  if (date === "None") return "";

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayStr = mm + "/" + dd + "/" + yyyy;

  const messageDate = new Date(date);
  const messageDay = String(messageDate.getDate()).padStart(2, "0");
  const messageMonth = String(messageDate.getMonth() + 1).padStart(2, "0");
  const messageYear = messageDate.getFullYear();
  const messageDateStr = messageMonth + "/" + messageDay + "/" + messageYear;

  let formattedChatDate = "";
  // If last message in chat date is equal with today's date -> chat date should be hh:mm
  if (todayStr === messageDateStr)
    formattedChatDate =
      String(messageDate.getHours()).padStart(2, "0") +
      ":" +
      String(messageDate.getMinutes()).padStart(2, "0");
  else {
    // If last message in chat was sent in this year -> chat date should be dd:mm (like Nov 25)
    if (yyyy === messageYear)
      formattedChatDate = monthNames[messageDate.getMonth()] + " " + messageDay;
    // If last message in chat was sent in another year -> chat date should be dd:mm:yyyy (like 25.11.2013)
    else
      formattedChatDate = messageDay + "." + messageMonth + "." + messageYear;
  }
  return formattedChatDate;
};

export const formatMessageDate = (date: string) => {
  if (date === "None") return "";

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayStr = mm + "/" + dd + "/" + yyyy;

  const messageDate = new Date(date);
  const messageDay = String(messageDate.getDate()).padStart(2, "0");
  const messageMonth = String(messageDate.getMonth() + 1).padStart(2, "0");
  const messageYear = messageDate.getFullYear();
  const messageDateStr = messageMonth + "/" + messageDay + "/" + messageYear;

  let formattedMessageDate = "";
  // If message date is equal with today's date -> date should be hh:mm
  if (todayStr === messageDateStr)
    formattedMessageDate =
      String(messageDate.getHours()).padStart(2, "0") +
      ":" +
      String(messageDate.getMinutes()).padStart(2, "0");
  else {
    // If message date is in this year -> message date should be dd:mm hh:mm (like Nov 25 10:15)
    if (yyyy === messageYear)
      formattedMessageDate =
        monthNames[messageDate.getMonth()] +
        " " +
        messageDay +
        " " +
        String(messageDate.getHours()).padStart(2, "0") +
        ":" +
        String(messageDate.getMinutes()).padStart(2, "0");
    // If message date is in another year -> message date should be dd:mm:yyyy hh:mm (like 25.12.2013 10:15)
    else
      formattedMessageDate =
        messageDay +
        "." +
        messageMonth +
        "." +
        messageYear +
        " " +
        String(messageDate.getHours()).padStart(2, "0") +
        ":" +
        String(messageDate.getMinutes()).padStart(2, "0");
  }
  return formattedMessageDate;
};

export const checkUserSawChat = (messageDate: string, userSawDate: string) => {
  const messageDateObj = new Date(messageDate);
  const userSawDateObj = new Date(userSawDate);

  if (messageDateObj.getTime() === userSawDateObj.getTime()) return false;
  if (messageDateObj < userSawDateObj) return false;
  if (messageDateObj > userSawDateObj) return true;
  return false;
};

export const getUserIsOnline = (lastActivityDate: string) => {
  const timeDifferenceMinutes = Math.floor(
    Math.abs(new Date().getTime() - new Date(lastActivityDate).getTime()) /
      60000
  );
  const activityLimit = 5;
  if (timeDifferenceMinutes <= activityLimit) return true;
  else return false;
};

export const checkUserHasPrivateChats = (userChats: ISidebarChatItem[]) => {
  return userChats.some((userChat) => userChat.chatType === ChatType.private);
};

export const createNotification = (type: string, message: string) => {
  switch (type) {
    case "success":
      NotificationManager.success(message, "Success");
      break;
    case "error":
      NotificationManager.error(message, "Something went wrong");
      break;
  }
};

export const checkInputFile = (file: File) => {
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

export const getChatIdByUserLogin = (
  chats: ISidebarChatItem[],
  userLogin: string
) => {
  return chats.find((chat) => {
    return chat.chatHeader === userLogin;
  })?.chatId;
};
