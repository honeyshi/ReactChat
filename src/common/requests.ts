import axios from "axios";
import {
  setBlockedUsers,
  setChatMembers,
  setCurrentChat,
  setDialogs,
  setErrorMessage,
  setFoundUsers,
  setIsAuth,
  setLoadBlocked,
  setLoadChats,
  setLoadMessages,
  setLoadSearch,
  setLogin,
  setResetState,
  setUserId,
  setUserInfo,
} from "store/actions";
import { history } from "core/history";
import { store } from "store/stores";
import {
  IChatMessageItem,
  ISidebarChatItem,
  ISidebarFriendItem,
  IUserInfo,
} from "common/interfaces";
import {
  formatLastChatActivityDate,
  checkUserSawChat,
  getUserIsOnline,
  createNotification,
  formatMessageDate,
  getUserHasNewMessages,
} from "common/functions";
import { ChatType } from "common/variables";
import { updateStoreToInitialState } from "common/functions/storeFunctions";

const apiUrl =
  "http://messengerpy-env-1.eba-rs4kjrzc.us-east-2.elasticbeanstalk.com";

export const performSignUpRequest = (
  login: string,
  email: string,
  password: string
) => {
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
    })
    .catch((error) => {
      store.dispatch(
        setErrorMessage("Something went wrong. Please try again.")
      );
    });
};

export const performSignInRequest = (
  login: string,
  password: string,
  isReset: boolean
) => {
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
        updateStoreToInitialState();
        store.dispatch(setErrorMessage(""));
        store.dispatch(setIsAuth(true));
        store.dispatch(setUserId(json.userId));
        store.dispatch(setLogin(login));
        performGetLastChatsRequest(json.userId);
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
    });
};

export const performSendLinkRequest = (login: string) => {
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
    });
};

export const performResetPasswordRequest = (
  login: string | null,
  password: string,
  confirmPassword: string
) => {
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
      });
  } else {
    store.dispatch(setErrorMessage("Passwords are not equal"));
  }
};

export const performGetLastChatsRequest = (
  userId: string,
  withLoader = true
) => {
  withLoader && store.dispatch(setLoadChats(true));

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
          isAdmin: json[item].is_admin === "1" ? true : false,
          isUnread: checkUserSawChat(json[item].date, json[item].last),
          isUserOnline: getUserIsOnline(json[item].online),
          lastMessageText: json[item].text,
          lastMessageTime: formatLastChatActivityDate(json[item].date),
        });
      }
      store.dispatch(setDialogs(sidebarChatItems));
      withLoader && store.dispatch(setLoadChats(false));
    })
    .catch((error) => console.log(error));
};

export const performGetBlockedUsersRequest = (userId: string) => {
  store.dispatch(setLoadBlocked(true));
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
        store.dispatch(setLoadBlocked(false));
      }
    })
    .catch((error) => console.log(error));
};

export const performSearchUserRequest = (login: string | undefined) => {
  store.dispatch(setLoadSearch(true));
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
        store.dispatch(setLoadSearch(false));
      } else {
        store.dispatch(setFoundUsers([]));
      }
    })
    .catch((error) => console.log(error));
};

export const performAddBlockedUserRequest = (
  userId: string,
  blockedUserLogin: string
) => {
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
            isAdmin: false,
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
    });
};

export const performRemoveBlockedUserRequest = (
  userId: string,
  blockedUserLogin: string
) => {
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
    });
};

export const performGetUserNoteRequest = (
  userId: string,
  userGetLogin: string
) => {
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
            isAdmin: currentChat.isAdmin,
            isOnline: currentChat.isOnline,
            chatMessages: currentChat.chatMessages,
            userNote: json.note,
          })
        );
      }
    })
    .catch((error) => console.log(error));
};

export const performUpdateUserNoteRequest = (
  userId: string,
  userNoteLogin: string,
  newNote: string
) => {
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
            isAdmin: currentChat.isAdmin,
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
    });
};

export const performGetMessagesRequest = (
  userId: string,
  chatId: string,
  page: number,
  withLoader = true
) => {
  withLoader && store.dispatch(setLoadMessages(true));
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
            isAdmin: currentChat.isAdmin,
            isOnline: currentChat.isOnline,
            chatMessages: chatMessages,
            userNote: json.note,
          })
        );
        withLoader && store.dispatch(setLoadMessages(false));
      }
    })
    .catch((error) => console.log(error));
};

export const performSendMessageRequest = (
  userId: string,
  chatId: string,
  message: string
) => {
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
    });
};

export const performCreatePrivateChatRequest = (
  userId: string,
  userLogin: string,
  message: string
) => {
  const url = `${apiUrl}/addPrivateChat`;
  const config = {
    id: userId,
    login: userLogin,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      performSendMessageRequest(userId, json.chatId, message);
    })
    .catch((error) => {
      createNotification(
        "error",
        "One or more errors occured while sending this messages. Please try again."
      );
    });
};

export const performCreateGroupChatRequest = (
  userId: string,
  groupName: string,
  groupMembers: string[]
) => {
  const url = `${apiUrl}/addChat`;
  const config = {
    id: userId,
    name: groupName,
    users: groupMembers,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      createNotification("success", "Group is created successfully.");
    })
    .catch((error) => {
      createNotification(
        "error",
        "One or more errors occured during group creation. Please try again."
      );
    });
};

export const performSetGroupChatImage = (
  imageFile: Blob,
  id: string,
  isUpdate = false
) => {
  const postUrl = `${apiUrl}/postPhoto`;
  const postConfig = new FormData();
  postConfig.append("file", imageFile);
  const setUrl = `${apiUrl}/setAvatarToGruop`;
  axios
    .post(postUrl, postConfig)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      const setConfig = {
        chat_id: id,
        avatarUrl: json.url,
      };
      axios
        .post(setUrl, setConfig)
        .then(() => {
          createNotification("success", "Image for group is set.");
          if (isUpdate) {
            const currentChat = store.getState().chat.chatItem;
            store.dispatch(
              setCurrentChat({
                chatHeader: currentChat.chatHeader,
                chatId: currentChat.chatId,
                chatImage: json.url,
                chatType: currentChat.chatType,
                isAdmin: currentChat.isAdmin,
                isOnline: currentChat.isOnline,
                chatMessages: currentChat.chatMessages,
                userNote: currentChat.userNote,
              })
            );
          }
        })
        .catch((error) => {
          createNotification(
            "error",
            "One or more errors occured while setting image. Please try again."
          );
        });
    })
    .catch((error) => {
      createNotification(
        "error",
        "One or more errors occured while setting image. Please try again."
      );
    });
};

export const performGetUserInfoRequest = (userId: string) => {
  const url = `${apiUrl}/getUserInfo`;
  const config = {
    user_id: userId,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        store.dispatch(
          setUserInfo({
            userEmail: json.email,
            userImage: json.avatarUrl,
            userLogin: json.login,
          })
        );
      }
    })
    .catch((error) => console.log(error));
};

export const performSetUserImageRequest = (imageFile: Blob, id: string) => {
  const postUrl = `${apiUrl}/postPhoto`;
  const postConfig = new FormData();
  postConfig.append("file", imageFile);
  const setUrl = `${apiUrl}/setAvatar`;
  axios
    .post(postUrl, postConfig)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      const setConfig = {
        id: id,
        avatarUrl: json.url,
      };
      axios
        .post(setUrl, setConfig)
        .then(() => {
          createNotification("success", "Your avatar is updated.");
          const currentUserInfo = store.getState().root.userInfo;
          store.dispatch(
            setUserInfo({
              userEmail: currentUserInfo.userEmail,
              userImage: json.url,
              userLogin: currentUserInfo.userLogin,
            })
          );
        })
        .catch((error) => {
          createNotification(
            "error",
            "One or more errors occured while setting image. Please try again."
          );
        });
    })
    .catch((error) => {
      createNotification(
        "error",
        "One or more errors occured while setting image. Please try again."
      );
    });
};

export const performDeleteMessageRequest = (messageId: string) => {
  const url = `${apiUrl}/deleteMessage`;
  const config = {
    message_id: messageId,
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
            isAdmin: currentChat.isAdmin,
            isOnline: currentChat.isOnline,
            chatMessages: currentChat.chatMessages.filter(
              (message) => message.messageId !== messageId
            ),
            userNote: json.note,
          })
        );
        createNotification("success", "Message was deleted.");
      } else {
        createNotification(
          "error",
          "One or more errors occured while deleting this messages. Please try again."
        );
      }
    })
    .catch((error) => {
      createNotification(
        "error",
        "One or more errors occured while deleting this messages. Please try again."
      );
    });
};

export const performGetGroupChatMembers = (chatId: string) => {
  const url = `${apiUrl}/getChatMembers`;
  const config = {
    chat_id: chatId,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      const users = json.users;
      let groupMembers: IUserInfo[] = [];
      for (var item in users) {
        groupMembers.push({
          userImage: users[item].avatarUrl,
          userLogin: users[item].login,
        });
      }
      store.dispatch(setChatMembers(groupMembers));
    })
    .catch((error) => console.log(error));
};

export const perfromDeleteGroupMemberRequest = (
  userLogin: string,
  chatId: string
) => {
  const url = `${apiUrl}/deleteFromGroup`;
  const config = {
    name: userLogin,
    chat_id: chatId,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        const groupMembers = store
          .getState()
          .chat.chatMembers.filter((groupMember) => {
            return groupMember.userLogin !== userLogin;
          });
        store.dispatch(setChatMembers(groupMembers));
        createNotification("success", "User was removed from group.");
      } else {
        createNotification(
          "error",
          "One or more errors occured while removing user from group. Please try again."
        );
      }
    })
    .catch((error) => {
      createNotification(
        "error",
        "One or more errors occured while removing user from group. Please try again."
      );
    });
};

export const performAddUsersInGroupRequest = (
  groupMembers: string[],
  chatId: string
) => {
  const url = `${apiUrl}/addMember`;
  const config = {
    user_login: groupMembers,
    chat_id: chatId,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        performGetGroupChatMembers(chatId);
        createNotification("success", "User was added to group.");
      } else {
        createNotification(
          "error",
          "One or more errors occured while adding user to group. Please try again."
        );
      }
    })
    .catch((error) => {
      createNotification(
        "error",
        "One or more errors occured while adding user to group. Please try again."
      );
    });
};

export const updateChatState = () => {
  const userId = store.getState().root.userId;
  const chatId = store.getState().chat.chatItem.chatId;
  const userLogin = store.getState().auth.login;
  performGetLastChatsRequest(userId, false);
  performGetMessagesRequest(userId, chatId, -1, false);
  const url = `${apiUrl}/isNewMessages`;
  const config = {
    secret_id: userId,
  };
  axios
    .post(url, config)
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      if (json.status !== "error") {
        for (var item in json) {
          if (
            getUserHasNewMessages(json[item].date) &&
            json[item].user !== userLogin
          ) {
            createNotification("info", "You have new message.");
            return;
          }
        }
      }
    })
    .catch((error) => console.log(error));
};
