import { isDate } from "../utils/common";
import {
  cookieNameRegExp,
  cookieValueRegExp,
  domainValueRegExp,
  pathValueRegExp,
} from "../utils/regExp";
import { SerializeOptions } from "./types";

export function serialize(
  name: string,
  val: string,
  options?: SerializeOptions
): string {
  const enc = options?.encode || encodeURIComponent;

  if (!cookieNameRegExp.test(name)) {
    throw new TypeError(`argument name is invalid: ${name}`);
  }

  const value = enc(val);

  if (!cookieValueRegExp.test(value)) {
    throw new TypeError(`argument val is invalid: ${val}`);
  }

  let str = name + "=" + value;
  if (!options) return str;

  if (options.maxAge !== undefined) {
    if (!Number.isInteger(options.maxAge)) {
      throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
    }

    str += "; Max-Age=" + options.maxAge;
  }

  if (options.domain) {
    if (!domainValueRegExp.test(options.domain)) {
      throw new TypeError(`option domain is invalid: ${options.domain}`);
    }

    str += "; Domain=" + options.domain;
  }

  if (options.path) {
    if (!pathValueRegExp.test(options.path)) {
      throw new TypeError(`option path is invalid: ${options.path}`);
    }

    str += "; Path=" + options.path;
  }

  if (options.expires && options.numberOfDays === undefined) {
    if (
      !isDate(options.expires) ||
      !Number.isFinite(options.expires.valueOf())
    ) {
      throw new TypeError(`option expires is invalid: ${options.expires}`);
    }

    str += "; Expires=" + options.expires.toUTCString();
  }

  if (options.numberOfDays) {
    const GetDate = new Date();
    GetDate.setTime(
      GetDate.getTime() + options.numberOfDays * 24 * 60 * 60 * 1000
    );

    str += "; Expires=" + GetDate.toUTCString();
  }

  if (options.httpOnly) {
    str += "; HttpOnly";
  }

  if (options.secure) {
    str += "; Secure";
  }

  if (options.partitioned) {
    str += "; Partitioned";
  }

  if (options.priority) {
    const priority =
      typeof options.priority === "string"
        ? options.priority.toLowerCase()
        : undefined;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError(`option priority is invalid: ${options.priority}`);
    }
  }

  if (options.sameSite) {
    const sameSite =
      typeof options.sameSite === "string"
        ? options.sameSite.toLowerCase()
        : options.sameSite;
    switch (sameSite) {
      case true:
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
    }
  }

  return str;
}
