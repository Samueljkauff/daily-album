import prisma from "../prisma/client.js";
import { getTokenByUserIdandDeviceId } from "../repositories/token_repositories.js";
import { refreshWithSpotify } from "../utils/spotify.js";

export const getValidAccessToken = async (
  userId: string,
  deviceId: string
): Promise<string> => {
  const token = await getTokenByUserIdandDeviceId(userId, deviceId);

  if (!token) {
    throw new Error("No token found for device");
  }

  if (token.expires_at > new Date()) {
    return token.access_token;
  }

  const refreshed = await refreshWithSpotify(token.refresh_token);

  const newExpiresAt = new Date(Date.now() + refreshed.expires_in * 1000);

  await prisma.token.update({
    where: { id: token.id },
    data: {
      access_token: refreshed.access_token,
      expires_at: newExpiresAt,
    },
  });

  return refreshed.access_token;
};
