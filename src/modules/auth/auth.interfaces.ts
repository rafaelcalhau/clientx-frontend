export interface AuthCookieSession {
  accessToken: string;
  user: UserSession;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  token: string;
}
