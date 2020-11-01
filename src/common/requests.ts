import https from "https";

export const performSignUpRequest = (
  login: string,
  email: string,
  password: string
) => {
  console.log(
    `Perform sign up request with login: ${login} email: ${email} pass: ${password}`
  );
  const signUpData = JSON.stringify({
    login: login,
    email: email,
    password: password
  });
  let response = "";
  var postOptions = {
    host: "domain.com",
    path: "/api/register",
    method: "POST",
    headers: {
      "Content-type": "application/json"
    }
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
    postRequest.write(signUpData);
    postRequest.end();
  });
};

export const performSignInRequest = (login: string, password: string) => {
  console.log(`Perform sign in request with login: ${login} pass: ${password}`);
  const signInData = JSON.stringify({
    login: login,
    password: password
  });

  let response = "";
  var postOptions = {
    host: "domain.com",
    path: "/api/login",
    method: "POST",
    headers: {
      "Content-type": "application/json"
    }
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
    postRequest.write(signInData);
    postRequest.end();
  });
};

export const performSendLinkRequest = (email: string) => {
  console.log(`Perform send link request with email: ${email}`);
  const sendLinkData = JSON.stringify({
    email: email
  });

  let response = "";
  var postOptions = {
    host: "domain.com",
    path: "/api/restore",
    method: "POST",
    headers: {
      "Content-type": "application/json"
    }
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
    confirmPassword: confirmPassword
  });

  let response = "";
  var postOptions = {
    host: "domain.com",
    path: "/api/restore",
    method: "POST",
    headers: {
      "Content-type": "application/json"
    }
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
