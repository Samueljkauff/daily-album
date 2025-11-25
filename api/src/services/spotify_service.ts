// import { createToken } from '../repositories/token_repositories.js';
import { createUser } from '../repositories/user_repository.js';
import * as spotifyApi from '../utils/spotify.js';

export const getRefreshToken = async (clientId: string, code: string, verifier: string) => {
  const tokenData = await spotifyApi.getRefreshToken(clientId, code, verifier);
  const profileData = await spotifyApi.getUserProfile(tokenData.access_token.toString());
  console.log(await createUser(profileData, tokenData));
  // console.log(await createToken(tokenData, profileData));

  return tokenData;
}