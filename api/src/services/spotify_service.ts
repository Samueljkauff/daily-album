import { createToken, findRefreshToken, findDevice, removeOldTokens } from '../repositories/token_repositories.js';
import type { User } from '@prisma/client';
import type { Token } from '@prisma/client';
import { createUser, findUserBySpotifyID } from '../repositories/user_repository.js';
import * as spotifyApi from '../utils/spotify.js';

export const getRefreshToken = async (clientId: string, code: string, verifier: string, userAgent: string, deviceID: string) => {
  const tokenData = await spotifyApi.getRefreshToken(clientId, code, verifier);
  const userData = await spotifyApi.getUserProfile(tokenData.access_token.toString());
  const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);


  const formattedUserData = {
    spotify_id: userData.id,
    username: userData.display_name,
    email: userData.email,
    avatar_url: userData.images?.[0]?.url || userData.images?.[1]?.url || null,
  } as User;
  const formattedTokenData = {
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expires_at: expiresAt,
    user_agent: userAgent,
    device_id: deviceID,
  } as Token;

  const user = await findUserBySpotifyID(formattedUserData.spotify_id);
  const refreshTokenExists = await findRefreshToken(formattedTokenData.refresh_token);
  const deviceExist = await findDevice(formattedUserData.spotify_id, formattedTokenData.user_agent, formattedTokenData.device_id);
  if(!user){
    await createUser(formattedUserData, formattedTokenData);
  }


  if(!refreshTokenExists || deviceExist) {
    await removeOldTokens(formattedUserData.spotify_id, formattedTokenData.user_agent, formattedTokenData.device_id);
    await createToken(formattedTokenData, formattedUserData.spotify_id);
  }

  return tokenData;
}