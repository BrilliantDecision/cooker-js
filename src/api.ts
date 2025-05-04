import { parse, serialize, SerializeOptions } from "cookie";
import { ServerOpts } from "./types";

const isBrowser = globalThis?.document;

const setCookie = (
  name: string,
  val: string,
  opts?: SerializeOptions & ServerOpts
) => {
  if (isBrowser) {
    return (document.cookie = serialize(name, val, opts));
  } else {
    return opts.res.setHeader("Set-Cookie", serialize(name, val, opts));
  }
};

const getCookie = (name: string, opts?: ServerOpts) => {
  if (isBrowser) {
    return parse(document.cookie)[name];
  } else {
    return parse(opts.req.headers.cookie)[name];
  }
};

const clearCookie = (name: string, opts?: SerializeOptions) => {
  setCookie(name, "", opts);
};

const removeCookie = (name: string, opts?: SerializeOptions) => {
  setCookie(name, "", { ...opts, maxAge: -1 });
};

export { setCookie, getCookie, removeCookie, clearCookie };
