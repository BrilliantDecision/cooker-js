import { IncomingMessage, ServerResponse } from "http";
import { SerializeOptions } from "../cookie/serialize/types";

export interface ServerOpts {
  req?: IncomingMessage;
  res?: ServerResponse;
}

export type ServerOptsSet = Pick<ServerOpts, "res">;
export type ServerOptsGet = Pick<ServerOpts, "req">;

export type SetCookieOpts = SerializeOptions & ServerOptsSet;
