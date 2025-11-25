// import { createToken } from '../repositories/token_repositories.js';
import type { User } from '@prisma/client';
import type { Token } from '@prisma/client';
import { createUser } from '../repositories/user_repository.js';
import * as spotifyApi from '../utils/spotify.js';

export const getRefreshToken = async (clientId: string, code: string, verifier: string) => {
  const tokenData = await spotifyApi.getRefreshToken(clientId, code, verifier);
  const userData = await spotifyApi.getUserProfile(tokenData.access_token.toString());

  const formattedUserData = {
    spotify_id: userData.id,
    username: userData.display_name,
    email: userData.email,
    avatar_url: userData.images[1].url,
  } as User;

  const formattedTokenData = {
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expires_in: tokenData.expires_in,
  } as Token;

  console.log(await createUser(formattedUserData, formattedTokenData));
  // console.log(await createToken(tokenData, profileData));

  return tokenData;
}