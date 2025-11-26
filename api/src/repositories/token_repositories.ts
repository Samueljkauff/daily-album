import type { Token } from "@prisma/client";
import prisma from "../prisma/client.js";

export const createToken = async (token: Token): Promise<Token> => {
    try {
        const created = await prisma.token.create({data: token});
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