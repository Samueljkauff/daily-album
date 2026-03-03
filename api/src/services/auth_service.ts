import { createToken, findRefreshToken, findDevice, removeOldTokens } from '../repositories/token_repositories.js';
import type { User } from '@prisma/client';
import type { Token } from '@prisma/client';
import { createUser, findUserBySpotifyID } from '../repositories/user_repository.js';
import * as authApi from '../utils/spotify.js';
import { generateJWT, type JWTSecrets } from '../auth/auth_service.js';

export const authenticateUser = async (clientId: string, code: string, verifier: string, userAgent: string, deviceID: string) => {
  const tokenData = await authApi.getRefreshToken(clientId, code, verifier);
  const userData = await authApi.getUserProfile(tokenData.access_token.toString());
  const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);


  const formattedUserData = {
    spotify_id: userData.id,
    username: userData.display_name,
    email: userData.email,
    avatar_url: userData.images?.[0]?.url || userData.images?.[1]?.url || null,
    created_at: new Date(),
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
  const JWTs = generateJWT(formattedUserData.spotify_id, formattedTokenData.device_id);
  const response = {
    access_token: JWTs.access_token,
    refresh_token:  JWTs.refresh_token,
    username: formattedUserData.username,
    email: formattedUserData.email,
    avatar_url: formattedUserData.avatar_url,
    created_at: formattedUserData.created_at,
}
  return response;
}
