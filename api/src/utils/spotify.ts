export const getRefreshToken = async (clientId: string, accessCode: string, verifier: string) => {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", accessCode);
    params.append("redirect_uri", "https://127.0.0.1:3000/callback");
    params.append("code_verifier", verifier!);

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    if (!res.ok){
       throw new Error(`Spotify token request failed: ${res.status}`);
    }
    
    return res.json();
}

export const getUserProfile = async (token: string) => {
  const res = await fetch("https://api.spotify.com/v1/me", {
    method: "GET", headers: { Authorization: `Bearer ${token}`}
  });
  return await res.json()
}