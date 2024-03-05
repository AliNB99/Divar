const setCookie = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken}; max-age=${
    1 * 24 * 60 * 60
  }`;
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${
    30 * 24 * 60 * 60
  }`;
};

const getCookie = (tokenName) => {
  return document.cookie
    .split(";")
    .find((token) => token.split("=")[0] === tokenName)
    ?.split("=")[1];
};

const deleteCookie = () => {
  document.cookie = "accessToken=; expires=Thu, 01 jan 1970 00:00:01 GMT;";
  document.cookie = "refreshToken=; expires=Thu, 01 jan 1970 00:00:01 GMT;";
};

export { setCookie, getCookie, deleteCookie };
