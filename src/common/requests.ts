import axios from "axios";
import querystring from "query-string";
import {
  setDialogs,
  setErrorMessage,
  setIsAuth,
  setResetState,
  setUserId,
} from "../store/actions";
import { history } from "../store/stores";
import { store } from "../index";
import { ISidebarChatItem } from "./interfaces";
import { formatLastChatActivityDate, checkUserSawChat } from "./functions";

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
      if (json.status !== "error") {
        let sidebarChatItems: ISidebarChatItem[] = [];
        for (var item in json) {
          sidebarChatItems.push({
            chatHeader: json[item].name,
            chatImage: json[item].image,
            isUnread: checkUserSawChat(json[item].date, json[item].last),
            lastMessageText: json[item].text,
            lastMessageTime: formatLastChatActivityDate(json[item].date),
          });
        }
        store.dispatch(setDialogs(sidebarChatItems));
      } else console.log(json);
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
        for (var item in json) {
          //console.log("Item is ", item);
          //console.log("Name ", json[item].name);
        }
        console.log(json);
      } else console.log(json);
    })
    .catch((error) => {
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
