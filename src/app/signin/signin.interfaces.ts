import type { IncomingMessage } from "http";

export type AppIncomingRequest = IncomingMessage & {
  cookies?: Partial<{ [key: string]: string;}>;
};

export interface AuthCookieSession {
  accessToken: string;
  user: UserSession;
}

export interface SignInInputs {
  username: string
  password: string
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  token: string;
}
