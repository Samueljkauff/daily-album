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
            device_id: token.device_id,
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

export const findUserAgent = async (refreshToken: string, userAgent: string | null, device_id: string): Promise<boolean> => {
    try {
        const result = await prisma.token.findMany({
            where: {
                user_agent: userAgent,
                device_id: device_id,
            }
        });

        for(let i = 0; i <= result.length; i++){
            if(result[i]?.refresh_token !== refreshToken && result[i]?.user_agent === userAgent){
            }
        }
        return result.length < 1;
    } catch(error) {
        throw error;
    }
}

export const removeOldTokens = async (user_agent: string) => {
    try {
        const deleted = prisma.token.deleteMany({
            where: {
                user_agent: user_agent,
            }
        });
        return deleted;
    } catch(error) {
        throw error;
    }
}