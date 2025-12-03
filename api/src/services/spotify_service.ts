import { createToken, findRefreshToken } from '../repositories/token_repositories.js';
import type { User } from '@prisma/client';
import type { Token } from '@prisma/client';
import { createUser, findUserBySpotifyID } from '../repositories/user_repository.js';
import * as spotifyApi from '../utils/spotify.js';

export const getRefreshToken = async (clientId: string, code: string, verifier: string, userAgent: string) => {
  const tokenData = await spotifyApi.getRefreshToken(clientId, code, verifier);
  const userData = await spotifyApi.getUserProfile(tokenData.access_token.toString());

  const formattedUserData = {
    spotify_id: userData.id,
    username: userData.display_name,
    email: userData.email,
    avatar_url: userData.images?.[0]?.url || userData.images?.[1]?.url || null,
  } as User;

  const formattedTokenData = {
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expires_in: tokenData.expires_in,
    user_agent: userAgent,
  } as Token;

  const hasAccount = await findUserBySpotifyID(formattedUserData.spotify_id);
  const refreshTokenExists = await findRefreshToken(formattedTokenData.refresh_token);

  if(!hasAccount){
    await createUser(formattedUserData, formattedTokenData);
  }

  if(hasAccount && !refreshTokenExists) {
    await createToken(formattedTokenData, formattedUserData.spotify_id);
  }

  return tokenData;
}