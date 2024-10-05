import defaultError from "./defaultError";
import requestError from "./noResponseError";
import noResponseError from "./requestError";

const __handleError = (error) => {
  if (error.response) {
    return defaultError(error.response.data);
  } else if (error.request) {
    return noResponseError(error.request);
  } else {
    return requestError(error.message);
  }
};

export default __handleError;
