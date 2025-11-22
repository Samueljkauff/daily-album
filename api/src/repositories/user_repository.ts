import type { User } from '../interfaces/user_interface.js';
import prisma from '../prisma/client.js';

export const createUser = async (user: User): Promise<User> => prisma.user.create({ user });