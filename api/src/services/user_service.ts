import type { User } from "@prisma/client";
import { findUserBySpotifyID } from "../repositories/user_repository.js"

export const getUserProfile = async (user_id: string): Promise<User> => {
    const profile = await findUserBySpotifyID(user_id);
    return profile;
}