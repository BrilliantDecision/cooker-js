import {
  cookieNameRegExp,
  cookieValueRegExp,
  domainValueRegExp,
  pathValueRegExp,
} from "../utils/regExp";
import { SerializeOptions } from "./types";

/**
 * Serialize data into a cookie header.
 *
 * Serialize a name value pair into a cookie string suitable for
 * http headers. An optional options object specifies cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 */
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

  if (options.domain && !domainValueRegExp.test(options.domain)) {
    throw new TypeError(`option domain is invalid: ${options.domain}`);
  }

  if (options.path && !pathValueRegExp.test(options.path)) {
    throw new TypeError(`option path is invalid: ${options.path}`);
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  for (let opt in options) {
    str += "; " + opt;
    let optionValue = options[opt];

    if (optionValue !== true) {
      str += "=" + optionValue;
    }
  }

  return str;
}
