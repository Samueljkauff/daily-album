import { Router, useRouter } from "vue-router";
import * as SpotifyApi from "../services/spotify-api";
import { Storage } from "../services/storage";

export function useSpotifyApi() {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
  let code = "" as string | null;
  let token = "" as string | null;
  let verifier = "" as string;
  let deviceID= null as string | null;
  let loading = true;
  let error: string | null = null;

  async function redirectToAuthCodeFlow(client_id: string) {
    verifier = await generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    await Storage.set('verifier', verifier);

    SpotifyApi.authFlow(CLIENT_ID, challenge);
  }

  async function handleRedirectCallBack(): Promise<string> {
    const router = useRouter();
    const response = new URLSearchParams(window.location.search);
    code = response.get("code");

    await Storage.set('code', code as string);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = await Storage.get('code');
      const authError = urlParams.get("error");

      if (authError) {
        retry(router);
        loading = false;
        throw new Error(`Authorization failed: ${authError}`);
      }

      if (!code) {
        retry(router);
        loading = false;
        throw new Error("No authorization code received");
      }
      
      deviceID = await Storage.get("deviceID");
      await getAccessToken(CLIENT_ID, code, deviceID);
      loading = false;

      setTimeout(() => {
        router.push("/tabs/tab2");
      }, 2000);

    } catch (err) {
      retry(router);
      loading = false;
      console.error(err);
      error = err instanceof Error ? err.message : "Unknown error occurred";
    }
    return code as string;
  }

  function retry(router: Router) {
    Storage.remove('code');
    Storage.remove('verifier');
    router.push("/");
  }

  async function generateCodeVerifier(length: number) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(verifier: string) {
    const data = new TextEncoder().encode(verifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  async function getAccessToken(clientId: string, code: string, deviceID: string | null): Promise<string | null> {
    deviceID = await Storage.get("deviceID");
    if(deviceID === null) {
      deviceID = crypto.randomUUID();
      await Storage.set("deviceID", deviceID);
    }
    const verifier = await Storage.get('verifier');
    const result = await SpotifyApi.getAccessToken(
      clientId,
      code,
      verifier as string,
      deviceID as string,
    );

    if (!result.ok) {
      const errorText = await result.text();
      console.error("Spotify token error:", errorText);
      throw new Error(`Token request failed (${result.status})`);
    }

    const { access_token } = await result.json();
    await Storage.set('token', access_token);
    token = await Storage.get('token');

    return token as string;
  }

  async function fetchUserProfile(token: string | null): Promise<any> {}
  async function populateUI(profile: any) {}

  return {
    redirectToAuthCodeFlow,
    CLIENT_ID,
    getAccessToken,
    handleRedirectCallBack,
    loading,
    error,
    retry,
  };
}
