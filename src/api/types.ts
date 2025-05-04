import { IncomingMessage, ServerResponse } from "http";

interface ServerOpts {
  req?: IncomingMessage;
  res?: ServerResponse;
}

export type ServerOptsSet = Pick<ServerOpts, "res">;
export type ServerOptsGet = Pick<ServerOpts, "req">;
