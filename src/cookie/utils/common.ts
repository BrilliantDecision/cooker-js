export function startIndex(str: string, index: number, max: number) {
  do {
    const code = str.charCodeAt(index);
    if (code !== 0x20 /*   */ && code !== 0x09 /* \t */) return index;
  } while (++index < max);
  return max;
}

export function endIndex(str: string, index: number, min: number) {
  while (index > min) {
    const code = str.charCodeAt(--index);
    if (code !== 0x20 /*   */ && code !== 0x09 /* \t */) return index + 1;
  }
  return min;
}

/**
 * URL-decode string value. Optimized to skip native call when no %.
 */
export function decode(str: string): string {
  if (str.indexOf("%") === -1) return str;

  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
}

const __toString = Object.prototype.toString;

/**
 * Determine if value is a Date.
 */
export function isDate(val: any): val is Date {
  return __toString.call(val) === "[object Date]";
}
