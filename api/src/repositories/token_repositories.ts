import type { Token } from "@prisma/client";
import prisma from "../prisma/client.js";

export const createToken = async (token: Token, userId: string): Promise<Token> => {
    try {
        const created = await prisma.token.create({
            data: {
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            expires_in: token.expires_in,
            user_agent: token.user_agent,
            user: {
                connect: { spotify_id: userId }
            }
            }
        });
        return created;
    } catch (error) {
        throw error;
    }
};

export const findRefreshToken = async (refreshToken: string): Promise<boolean> => {
    try {
        const token = await prisma.token.findUnique({
            where: {
                refresh_token: refreshToken
            }
        });
        return token !== null;
    } catch(error) {
        throw error;
    }
};

export const findUserAgent = async (refreshToken: string, userAgrent: string | null): Promise<boolean> => {
    try {
        const agent = await prisma.token.findUnique({
            where: {
                refresh_token: refreshToken,
                user_agent: userAgrent
            }
        });
        return agent !== null;
    } catch(error) {
        throw error;
    }
}