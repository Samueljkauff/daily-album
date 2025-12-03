import type { Token } from "../interfaces/token_interface";

export const createToken = async (data: Token) => {
  const res = await fetch("http://localhost:2121/api/token/create", {
    method: "POST",
    headers: { "Content-Type": "appliction/json" },
    body: JSON.stringify({ data }),
  });
  return res.json();
};