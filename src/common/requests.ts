import https from "https";
import axios from "axios";
import querystring from "query-string";
import { setErrorMessage } from "../store/actions";
import { history } from "../store/stores";
import { store } from "../index";

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

export const performSignInRequest = (login: string, password: string) => {
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
      if (json.status !== "error") store.dispatch(setErrorMessage(""));
      else
        store.dispatch(
          setErrorMessage(
            json.description.charAt(0).toUpperCase() + json.description.slice(1)
          )
        );
    })
    .catch((error) => {
      //store.dispatch(setErrorMessage(error));
      console.log(error);
    });
};

export const performSendLinkRequest = (email: string) => {
  console.log(`Perform send link request with email: ${email}`);
  const sendLinkData = JSON.stringify({
    email: email,
  });

  let response = "";
  var postOptions = {
    host: "domain.com",
    path: "/api/restore",
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };
  return new Promise((resolve, reject) => {
    const postRequest = https.request(postOptions, (res) => {
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        response = chunk;
      });
      res.on("end", () => {
        resolve(response);
      });
    });
    postRequest.on("error", (error) => {
      reject(error);
    });
    postRequest.write(sendLinkData);
    postRequest.end();
  });
};

export const performResetPasswordRequest = (
  password: string,
  confirmPassword: string
) => {
  console.log(
    `Perform reset passsword request with password: ${password} and confirmed password: ${confirmPassword}`
  );
  const resetPasswordData = JSON.stringify({
    passsword: password,
    confirmPassword: confirmPassword,
  });

  let response = "";
  var postOptions = {
    host: "domain.com",
    path: "/api/restore",
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };
  if (password === confirmPassword) {
    return new Promise((resolve, reject) => {
      const postRequest = https.request(postOptions, (res) => {
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          response = chunk;
        });
        res.on("end", () => {
          resolve(response);
        });
      });
      postRequest.on("error", (error) => {
        reject(error);
      });
      postRequest.write(resetPasswordData);
      postRequest.end();
    });
  } else console.log("Passwords are not equal");
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
