import axios from "axios";
import querystring from "query-string";
import {
  setBlockedUsers,
  setCurrentChat,
  setDialogs,
  setErrorMessage,
  setFoundUsers,
  setIsAuth,
  setResetState,
  setUserId,
} from "../store/actions";
import { history } from "../store/stores";
import { store } from "../index";
import {
  IChatMessageItem,
  ISidebarChatItem,
  ISidebarFriendItem,
} from "./interfaces";
import {
  formatLastChatActivityDate,
  checkUserSawChat,
  getUserIsOnline,
  createNotification,
  formatMessageDate,
} from "./functions";
import { ChatType } from "./variables";

const apiUrl =
  "http://messengerpy-env-1.eba-rs4kjrzc.us-east-2.elasticbeanstalk.com";

export const performSignUpRequest = (
  login: string,
  email: string,
  password: string
) => {
  console.log(
    `Perform sign up request with login: ${login} email: ${email} pass: ${password}`
  );
  const url = `${apiUrl}/register`;
  const config = {
    login: login,
    email: email,
    password: password,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        store.dispatch(setErrorMessage(""));
        history.push("/signin");
      } else
        store.dispatch(
          setErrorMessage(
            json.description.charAt(0).toUpperCase() + json.description.slice(1)
          )
        );
      console.log(response.data);
    })
    .catch((error) => {
      store.dispatch(
        setErrorMessage("Something went wrong. Please try again.")
      );
      console.log(error);
    });
};

export const performSignInRequest = (
  login: string,
  password: string,
  isReset: boolean
) => {
  console.log(`Perform sign in request with login: ${login} pass: ${password}`);
  const url = `${apiUrl}/login`;
  const config = {
    login: login,
    password: password,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        store.dispatch(setErrorMessage(""));
        store.dispatch(setIsAuth(true));
        store.dispatch(setUserId(json.userId));
        if (isReset) history.push("/reset-password");
        else history.push("/");
      } else {
        store.dispatch(
          setErrorMessage(
            json.description.charAt(0).toUpperCase() + json.description.slice(1)
          )
        );
        store.dispatch(setIsAuth(false));
        store.dispatch(setUserId(""));
      }
    })
    .catch((error) => {
      store.dispatch(
        setErrorMessage("Something went wrong. Please try again.")
      );
      console.log(error);
    });
};

export const performSendLinkRequest = (login: string) => {
  console.log(`Perform send link request with login: ${login}`);

  const url = `${apiUrl}/forget`;
  const config = {
    login: login,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        store.dispatch(setErrorMessage(""));
        store.dispatch(setResetState(true));
        history.push("/success-reset");
      } else
        store.dispatch(
          setErrorMessage(
            json.description.charAt(0).toUpperCase() + json.description.slice(1)
          )
        );
    })
    .catch((error) => {
      store.dispatch(
        setErrorMessage("Something went wrong. Please try again.")
      );
      console.log(error);
    });
};

export const performResetPasswordRequest = (
  login: string | null,
  password: string,
  confirmPassword: string
) => {
  console.log(
    `Perform reset passsword request for user: ${login} with password: ${password} and confirmed password: ${confirmPassword}`
  );

  const url = `${apiUrl}/restore`;
  const config = {
    login: login,
    password: password,
  };
  if (confirmPassword === password) {
    axios
      .post(url, config)
      .then((response) => {
        const json = JSON.parse(JSON.stringify(response.data));
        if (json.status !== "error") {
          store.dispatch(setErrorMessage(""));
          store.dispatch(setResetState(false));
          history.push("/signin");
        } else
          store.dispatch(
            setErrorMessage(
              json.description.charAt(0).toUpperCase() +
                json.description.slice(1)
            )
          );
      })
      .catch((error) => {
        store.dispatch(
          setErrorMessage("Something went wrong. Please try again.")
        );
        console.log(error);
      });
  } else {
    console.log("ERROR!");
    store.dispatch(setErrorMessage("Passwords are not equal"));
  }
};

export const performGetLastChatsRequest = (userId: string) => {
  console.log(`Perform get last chats request for user with id ${userId}`);

  const url = `${apiUrl}/chats`;
  const config = {
    id: userId,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      let sidebarChatItems: ISidebarChatItem[] = [];
      for (var item in json) {
        sidebarChatItems.push({
          chatHeader: json[item].name,
          chatImage: json[item].image,
          chatId: json[item].chat_id,
          chatType: json[item].type_chat,
          isUnread: checkUserSawChat(json[item].date, json[item].last),
          isUserOnline: getUserIsOnline(json[item].online),
          lastMessageText: json[item].text,
          lastMessageTime: formatLastChatActivityDate(json[item].date),
        });
      }
      store.dispatch(setDialogs(sidebarChatItems));
      console.log(json);
      console.log(sidebarChatItems);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const performGetBlockedUsersRequest = (userId: string) => {
  console.log(`Perform get blocked users request for user with id ${userId}`);

  const url = `${apiUrl}/getBlockedUsers`;
  const config = {
    id: userId,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        let sidebarBlockedUsers: ISidebarFriendItem[] = [];
        for (var item in json) {
          sidebarBlockedUsers.push({
            canDelete: true,
            friendImage: json[item].avatarUrl,
            friendName: json[item].login,
            isOnline: getUserIsOnline(json[item].lastActivity),
          });
        }
        store.dispatch(setBlockedUsers(sidebarBlockedUsers));
        console.log(json);
        console.log(sidebarBlockedUsers);
      } else console.log(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const performSearchUserRequest = (login: string | undefined) => {
  console.log(`Perform search user request by login ${login}`);

  const url = `${apiUrl}/findUser`;
  const config = {
    login: login,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        let sidebarFoundUsers: ISidebarFriendItem[] = [];
        for (var item in json) {
          sidebarFoundUsers.push({
            canDelete: false,
            friendImage: json[item].avatarUrl,
            friendName: json[item].login,
            isOnline: getUserIsOnline(json[item].lastActivity),
          });
        }
        store.dispatch(setFoundUsers(sidebarFoundUsers));
        console.log(json);
        console.log(sidebarFoundUsers);
      } else {
        console.log(json);
        store.dispatch(setFoundUsers([]));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const performAddBlockedUserRequest = (
  userId: string,
  blockedUserLogin: string
) => {
  console.log(
    `Perform block user request. Id of user who blocks: ${userId}. Blocked user: ${blockedUserLogin}`
  );
  const url = `${apiUrl}/addBlockedUsers`;
  const config = {
    id: userId,
    blocked_user_login: blockedUserLogin,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        createNotification("success", "User is blocked");
        const sidebarChats = store
          .getState()
          .sidebar.sidebarDialogs.filter((sidebarChat) => {
            return sidebarChat.chatHeader !== blockedUserLogin;
          });
        store.dispatch(setDialogs(sidebarChats));
        store.dispatch(
          setCurrentChat({
            chatHeader: "",
            chatId: "",
            chatImage: "",
            chatType: ChatType.group,
            isOnline: "",
            chatMessages: [],
            userNote: "",
          })
        );
      } else
        createNotification(
          "error",
          json.description.charAt(0).toUpperCase() + json.description.slice(1)
        );
    })
    .catch((error) => {
      createNotification("error", "Something went wrong. Please try again.");
      console.log(error);
    });
};

export const performRemoveBlockedUserRequest = (
  userId: string,
  blockedUserLogin: string
) => {
  console.log(
    `Perform remove blocked user request. Id of user who blocks: ${userId}. Blocked user: ${blockedUserLogin}`
  );
  const url = `${apiUrl}/removeBlockedUsers`;
  const config = {
    id: userId,
    blocked_user_login: blockedUserLogin,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        createNotification("success", "User is removed from blocked users");
        const sidebarBlockedUsers = store
          .getState()
          .sidebar.sidebarBlockedUsers.filter((blockedUser) => {
            return blockedUser.friendName !== blockedUserLogin;
          });
        store.dispatch(setBlockedUsers(sidebarBlockedUsers));
      } else
        createNotification(
          "error",
          json.description.charAt(0).toUpperCase() + json.description.slice(1)
        );
    })
    .catch((error) => {
      createNotification("error", "Something went wrong. Please try again.");
      console.log(error);
    });
};

export const performGetUserNoteRequest = (
  userId: string,
  userGetLogin: string
) => {
  console.log(
    `Perform get note for user. Id of user who gets: ${userId}. Login user with note: ${userGetLogin}`
  );
  const url = `${apiUrl}/getNote`;
  const config = {
    id: userId,
    noted_user_login: userGetLogin,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        const currentChat = store.getState().chat.chatItem;
        store.dispatch(
          setCurrentChat({
            chatHeader: currentChat.chatHeader,
            chatId: currentChat.chatId,
            chatImage: currentChat.chatImage,
            chatType: currentChat.chatType,
            isOnline: currentChat.isOnline,
            chatMessages: currentChat.chatMessages,
            userNote: json.note,
          })
        );
      } else console.log(json);
    })
    .catch((error) => console.log(error));
};

export const performUpdateUserNoteRequest = (
  userId: string,
  userNoteLogin: string,
  newNote: string
) => {
  console.log(
    `Perform update user's note request. Id of user who updates: ${userId}. User with not: ${userNoteLogin}. New note: ${newNote}`
  );
  const url = `${apiUrl}/addNote`;
  const config = {
    id: userId,
    noted_user_login: userNoteLogin,
    note: newNote,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        createNotification("success", "User's note is updated");
        const currentChat = store.getState().chat.chatItem;
        store.dispatch(
          setCurrentChat({
            chatHeader: currentChat.chatHeader,
            chatId: currentChat.chatId,
            chatImage: currentChat.chatImage,
            chatType: currentChat.chatType,
            isOnline: currentChat.isOnline,
            chatMessages: currentChat.chatMessages,
            userNote: newNote,
          })
        );
      } else
        createNotification(
          "error",
          json.description.charAt(0).toUpperCase() + json.description.slice(1)
        );
    })
    .catch((error) => {
      createNotification("error", "Something went wrong. Please try again.");
      console.log(error);
    });
};

export const performGetMessagesRequest = (
  userId: string,
  chatId: string,
  page: number
) => {
  console.log(
    `Perform request get messages for user. User's id: ${userId}. Chat id: ${chatId}`
  );
  const url = `${apiUrl}/getMessages`;
  const config = {
    id: userId,
    chatId: chatId,
    page: page,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        const messages = json.messages;
        console.log(messages);
        let chatMessages: IChatMessageItem[] = [];
        for (var item in messages) {
          chatMessages.push({
            isRight: messages[item].user.id === store.getState().root.userId,
            messageId: messages[item].id,
            messageText: messages[item].message,
            messageTime: formatMessageDate(messages[item].timestamp),
            senderName: messages[item].user.name,
            userImage: messages[item].user.avatarUrl,
          });
        }
        const currentChat = store.getState().chat.chatItem;
        store.dispatch(
          setCurrentChat({
            chatHeader: currentChat.chatHeader,
            chatId: currentChat.chatId,
            chatImage: currentChat.chatImage,
            chatType: currentChat.chatType,
            isOnline: currentChat.isOnline,
            chatMessages: chatMessages,
            userNote: json.note,
          })
        );
      } else console.log(json);
    })
    .catch((error) => console.log(error));
};

export const performSendMessageRequest = (
  userId: string,
  chatId: string,
  message: string
) => {
  console.log(
    `Perform send request with text ${message}. User's id: ${userId}. Chat id: ${chatId}`
  );
  const url = `${apiUrl}/newMessage`;
  const config = {
    id: userId,
    chatId: chatId,
    message: message,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        performGetMessagesRequest(userId, chatId, 0);
      } else
        createNotification(
          "error",
          "One or more errors occured while sending this messages. Please try again."
        );
    })
    .catch((error) => {
      createNotification(
        "error",
        "One or more errors occured while sending this messages. Please try again."
      );
      console.log(error);
    });
};

export const performCreatePrivateChatRequest = (
  userId: string,
  userLogin: string,
  message: string
) => {
  console.log(
    `Perform create private chat request and send message. User's id: ${userId}. User login: ${userLogin}`
  );
  const url = `${apiUrl}/addPrivateChat`;
  const config = {
    id: userId,
    login: userLogin,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      console.log(json);
      performSendMessageRequest(userId, json.chatId, message);
    })
    .catch((error) => {
      createNotification(
        "error",
        "One or more errors occured while sending this messages. Please try again."
      );
      console.log(error);
    });
};

const testRequestAx = () => {
  const sendLinkData = {
    after_id: -1,
  };

  const get_request_args = querystring.stringify(sendLinkData);
  const url =
    "http://messengerpy-env-1.eba-rs4kjrzc.us-east-2.elasticbeanstalk.com/messages?" +
    get_request_args;
  console.log("Test Axios!");
  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.log(error));
};

export const testRequest = () => {
  console.log("Resolve!");
  testRequestAx();
};
