import type { Token } from "@prisma/client";
import type { User } from "@prisma/client";
import prisma from "../prisma/client.js";

export const createUser = async (user: User, token: Token): Promise<User> => {
  try {
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
    throw error;
  }
};

export const findUserBySpotifyID = async (spotify_id: string): Promise<boolean> => {
    try {
    prisma.user.findUnique({
        where: {
            spotify_id: spotify_id
        }
    });
        return true;
    } catch (error){
        return false;
    }
};

export const findRefreshToken = async (refreshToken: string): Promise<boolean> => {
    try {
        prisma.token.findUnique({
            where: {
                refresh_token: refreshToken
            }
        })
        return true;
    } catch(error) {
        return false;
    }
};

export const findUserAgent = async (refreshToken: string, userAgrent: string | null): Promise<boolean> => {
    try {
        prisma.token.findUnique({
            where: {
                refresh_token: refreshToken,
                user_agent: userAgrent
            }
        })
        return true;
    } catch(error) {
        return false;
    }
}
