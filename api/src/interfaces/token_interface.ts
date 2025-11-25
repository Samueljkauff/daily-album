import type { User } from "./user_interface.js";

export interface Token {
  id: number;
  userId: string;
  refresh_token: string;
  access_token: string;
  expires_in: Date;
  revoked: boolean;
  ip_address: string | null;
  user_agent: string | null;
  created_at: Date;
  user: User;
}