import type { Token } from "../interfaces/token_interface.js";
import type { User } from "../interfaces/user_interface.js";
import prisma from "../prisma/client.js";

export const createUser = async (user: User, token: Token): Promise<User> => {
    console.log(JSON.stringify(user) + JSON.stringify(token))
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
  return created;
} catch (error) {
    console.log(error);
    throw error;
}
};


