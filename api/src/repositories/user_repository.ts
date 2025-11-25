import type { Token } from "@prisma/client";
import type { User } from "@prisma/client";
import prisma from "../prisma/client.js";

export const createUser = async (user: User, token: Token): Promise<User> => {
try{
  const created = prisma.user.create({
    data: {
      spotify_id: user.spotify_id,
      username: user.username,
      email: user.email,
      avatar_url: user.avatar_url,
      tokens: { create: [token] },
    },
  });
      console.log(await created);
  return created;
} catch (error) {
    console.log(error);
    throw error;
}
};


