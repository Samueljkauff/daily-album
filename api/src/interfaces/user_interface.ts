import type { Token } from "./token_interface.js";

export interface User {
  id: string;
  spotify_id: string;
  username: string;
  email: string;
  avatar_url: string | null;
  created_at: Date;
  updated_at: Date;
  tokens?: Token[];
}