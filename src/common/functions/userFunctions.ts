import { ISidebarChatItem } from "common/interfaces";
import { ChatType } from "common/variables";

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

export const getUserHasNewMessages = (messageDate: string) => {
  const timeDifferenceSeconds = Math.floor(
    Math.abs(new Date().getTime() - new Date(messageDate).getTime()) / 1000
  );
  const differenceLimit = 120;
  if (timeDifferenceSeconds <= differenceLimit) return true;
  else return false;
};

export const checkUserHasPrivateChats = (userChats: ISidebarChatItem[]) => {
  return userChats.some((userChat) => userChat.chatType === ChatType.private);
};

export const getChatIdByUserLogin = (
  chats: ISidebarChatItem[],
  userLogin: string
) => {
  return chats.find((chat) => {
    return chat.chatHeader === userLogin;
  })?.chatId;
};
