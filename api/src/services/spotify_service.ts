import { createToken, findRefreshToken } from '../repositories/token_repositories.js';
import type { User } from '@prisma/client';
import type { Token } from '@prisma/client';
import { createUser, findUserBySpotifyID } from '../repositories/user_repository.js';
import * as spotifyApi from '../utils/spotify.js';

export const getRefreshToken = async (clientId: string, code: string, verifier: string) => {
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
  } as Token;

  const hasAccount = await findUserBySpotifyID(formattedUserData.spotify_id);
  const refreshTokenExists = await findRefreshToken(formattedTokenData.refresh_token);

  if(!hasAccount){
    await createUser(formattedUserData, formattedTokenData);
  }

  if(hasAccount && !refreshTokenExists) {
    const { user_agent } = await createToken(formattedTokenData, formattedUserData.spotify_id);
    // if this user agent is found associated with a token in our array that is not this one
    // delete them.
    if(user_agent) {
      console.log("deleted old tokens!")
    }
  }

  return tokenData;
}