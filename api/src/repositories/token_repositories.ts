import type { Token } from "../interfaces/token_interface.js";
import type { User } from "../interfaces/user_interface.js";
import prisma from "../prisma/client.js";

// export const createToken = async (tokenData: Token, user: User): Promise<Token> => {
//     const data = { ...tokenData, userId: user.spotify_id, revoked: false, user: user };
//     console.log(data)
//     try {
//         const created = await prisma.token.create({ data });
//         return created;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// };