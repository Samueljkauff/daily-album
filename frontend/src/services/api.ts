import { User } from "@/interfaces/user_interface";
import type { Token } from "../interfaces/token_interface";

export const createToken = async (data: Token) => {
  const res = await fetch("http://localhost:2121/api/token/create", {
    method: "POST",
    headers: { "Content-Type": "appliction/json" },
    body: JSON.stringify({ data }),
  });
  return res.json();
};

export const getUser = async (jwt: string): Promise<User> => {
  const res = await fetch("http://localhost:2121/api/user/profile", {
    method: "GET",
    headers: {"Content-Type": "application/json",
              "Authorization": `Bearer ${jwt}`,
    }
  });
  return res.json();
}