import type { Token } from "@prisma/client";
import prisma from "../prisma/client.js";

export const createToken = async (token: Token, userId: string): Promise<Token> => {
    try {
        const created = await prisma.token.create({
            data: {
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            expires_at: token.expires_at,
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

export const findRefreshToken = async (refreshToken: string): Promise<any> => {
    try {
        const token = await prisma.token.findUnique({
            where: {
                refresh_token: refreshToken
            }
        });
        return token;
    } catch(error) {
        throw error;
    }
};

export const findDevice = async (userId: string, userAgent: string | null, deviceId: string): Promise<boolean> => {
    try {
        const devices = await prisma.token.findMany({
            where: {
                user_id: userId,
                OR: [
                    { user_agent: userAgent },
                    { device_id: deviceId }
                ]
            }
        });

        return devices.length >= 1;
    } catch(error) {
        throw error;
    }
}

export const removeOldTokens = async (userId: string, user_agent: string | null, deviceId: string) => {
    try {
        const deleted = await prisma.token.deleteMany({
            where: {
                user_id: userId,
            OR: [
                { user_agent: user_agent },
                { device_id: deviceId },
            ]
            }
        });
        return deleted;
    } catch(error) {
        throw error;
    }
}

export const getTokenByUserIdandDeviceId = async (userId: string, deviceId: string) => {
    try {
        const token = await prisma.token.findFirst({
            where: {
                user_id: userId,
                device_id: deviceId,
                revoked: false,
            }
        });
        return token;
    } catch (error) {
        throw error;
    }
}