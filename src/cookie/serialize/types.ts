export interface SerializeOptions {
  encode?: (str: string) => string;
  maxAge?: number;
  expires?: Date;
  domain?: string;
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  partitioned?: boolean;
  priority?: "low" | "medium" | "high";
  sameSite?: boolean | "lax" | "strict" | "none";
  numberOfDays?: number;
}
