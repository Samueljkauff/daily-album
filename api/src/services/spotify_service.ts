import * as spotifyApi from '../utils/spotify.js';

export const getRefreshToken = async (clientId: string, code: string, verifier: string) => {
  const data = await spotifyApi.getRefreshToken(clientId, code, verifier);
  console.log(data);
  const profileData = await spotifyApi.getUserProfile(data.access_token.toString());
  console.log(profileData);

  return data;
}