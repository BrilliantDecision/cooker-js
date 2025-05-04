import { decode, endIndex, startIndex } from "../utils/common";
import { ParseOptions } from "./types";

export function parse(
  str: string,
  options?: ParseOptions
): Record<string, string | undefined> {
  const obj: Record<string, string | undefined> = {};
  const len = str.length;
  // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
  if (len < 2) return obj;

  const dec = options?.decode || decode;
  let index = 0;

  do {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) break; // No more cookie pairs.

    const colonIdx = str.indexOf(";", index);
    const endIdx = colonIdx === -1 ? len : colonIdx;

    if (eqIdx > endIdx) {
      // backtrack on prior semicolon
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }

    const keyStartIdx = startIndex(str, index, eqIdx);
    const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
    const key = str.slice(keyStartIdx, keyEndIdx);

    // only assign once
    if (obj[key] === undefined) {
      let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
      let valEndIdx = endIndex(str, endIdx, valStartIdx);

      const value = dec(str.slice(valStartIdx, valEndIdx));
      obj[key] = value;
    }

    index = endIdx + 1;
  } while (index < len);

  return obj;
}
