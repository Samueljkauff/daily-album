import { User } from "@/interfaces/user_interface";

export const getUser = async (jwt: string): Promise<User> => {
  const res = await fetch("http://localhost:2121/api/user/profile", {
    method: "GET",
    headers: {"Content-Type": "application/json",
              "Authorization": `Bearer ${jwt}`,
    }
  });
  return res.json();
}