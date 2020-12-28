import { ChatType } from "common/variables";
import {
  setActiveNavbar,
  setBlockedUsers,
  setChatMembers,
  setCurrentChat,
  setDialogs,
  setFoundUsers,
  setGroupChatMembers,
  setGroupChatName,
  setIsAuth,
  setUserId,
  setUserInfo,
} from "store/actions";
import { store } from "store/stores";

export const updateStoreToInitialState = () => {
  store.dispatch(setIsAuth(false));
  store.dispatch(setUserId(""));
  store.dispatch(setActiveNavbar("tab-content-dialogs"));
  store.dispatch(
    setUserInfo({
      userEmail: "",
      userImage: "",
      userLogin: "",
    })
  );
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
  store.dispatch(setChatMembers([]));
  store.dispatch(setDialogs([]));
  store.dispatch(setBlockedUsers([]));
  store.dispatch(setFoundUsers([]));
  store.dispatch(setGroupChatName(""));
  store.dispatch(setGroupChatMembers([]));
};
