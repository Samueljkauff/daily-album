import { Router, useRouter } from "vue-router";
import * as SpotifyApi from "../services/spotify-api";
import { Storage } from "../services/storage";
import { User } from "@/interfaces/user_interface";
import { DeviceCheck } from "@/services/device-check";

export function useSpotifyApi() {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
  let code = "" as string | null;
  let user = {} as User;
  let verifier = "" as string;
  let deviceID= null as string | null;
  let loading = true;
  let error= null as string | null ;
  let isMobile= true as boolean;
  let redirect= "" as string;


  async function redirectToAuthCodeFlow(client_id: string) {
    isMobile= DeviceCheck.isMobile();
    redirect= (isMobile) ? "daily-album://callback" : "https://127.0.0.1:3000/callback"
    verifier = await generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    await Storage.set('verifier', verifier);
    await Storage.set('redirect', redirect);

    SpotifyApi.authFlow(CLIENT_ID, challenge, redirect);
  }

  async function handleRedirectCallBack(): Promise<any> {
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
      redirect = await Storage.get("redirect") as string;
      
      user = await getUser(CLIENT_ID, code, deviceID, redirect);
      loading = false;

    } catch (err) {
      retry(router);
      loading = false;
      console.error(err);
      error = err instanceof Error ? err.message : "Unknown error occurred";
    }

    return user;
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

  async function getUser(clientId: string, code: string, deviceID: string | null, redirect: string): Promise<User> {
    console.log(redirect)
    deviceID = await Storage.get("deviceID");
    if(deviceID === null) {
      deviceID = crypto.randomUUID();
      await Storage.set("deviceID", deviceID);
    }
    const verifier = await Storage.get('verifier');
    const result = await SpotifyApi.getUser(
      clientId,
      code,
      verifier as string,
      deviceID as string,
      redirect as string,
    );

    if (!result.ok) {
      const errorText = await result.text();
      console.error("Spotify User error:", errorText);
      throw new Error(`User request failed (${result.status})`);
    }

    user = await result.json();
    
    return user;
  }

  async function populateUI(profile: any) {

  }

  return {
    redirectToAuthCodeFlow,
    CLIENT_ID,
    getUser,
    handleRedirectCallBack,
    loading,
    error,
    retry,
  };
}
