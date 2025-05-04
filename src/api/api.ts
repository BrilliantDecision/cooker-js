import { parse, serialize } from "../cookie";
import { SerializeOptions } from "../cookie/serialize/types";
import { isBrowser } from "../utils/common";
import { ServerOptsGet, ServerOptsSet } from "./types";

/**
 * Function to set cookie on the client/server
 * @param name - cookie name
 * @param val - cookie value
 * @param opts - cookie options
 * @returns string with the cookie and options
 */
const setCookie = (
  name: string,
  val: string,
  opts?: SerializeOptions & ServerOptsSet
) => {
  if (isBrowser) {
    return (document.cookie = serialize(name, val, { path: "/", ...opts }));
  } else {
    return opts.res.setHeader(
      "Set-Cookie",
      serialize(name, val, { path: "/", ...opts })
    );
  }
};

/**
 * Function to get cookie on the client/server
 * @param name - cookie name
 * @param opts - cookie options
 * @returns string with cookie value
 */
const getCookie = (name: string, opts?: ServerOptsGet) => {
  if (isBrowser) {
    return parse(document.cookie)[name];
  } else {
    return parse(opts.req.headers.cookie)[name];
  }
};

/**
 * Function to set cookie to empty string value
 * @param name - cookie name
 * @param opts - cookie options
 */
const clearCookie = (name: string, opts?: SerializeOptions & ServerOptsSet) => {
  setCookie(name, "", opts);
};

/**
 * Function to remove cookie on the client/server
 * @param name - cookie name
 * @param opts - cookie options
 */
const removeCookie = (
  name: string,
  opts?: SerializeOptions & ServerOptsSet
) => {
  setCookie(name, "", { ...opts, maxAge: -1 });
};

export { setCookie, getCookie, removeCookie, clearCookie };
