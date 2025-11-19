import * as spotifyApi from '../utils/spotify.js';

export const getRefreshToken = async (clientId: string, code: string, verifier: string) => {
  const data = await spotifyApi.getRefreshToken(clientId, code, verifier);
  return data;
}

export const getUserProfile = async (token: string) => {
  const data = await spotifyApi.getUserProfile(token);
  return token;
}