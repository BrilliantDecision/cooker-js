import { IncomingMessage, ServerResponse } from "http";

export interface ServerOpts {
  req?: IncomingMessage;
  res?: ServerResponse;
}
