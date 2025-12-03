
export const authFlow = (clientId: string, challenge: string) => {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "https://127.0.0.1:3000/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export const getAccessToken = async (clientId: string, accessCode: string, verifier: string, deviceID: string) => {
    const userAgent = navigator.userAgent;
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", accessCode);
    params.append("redirect_uri", "https://127.0.0.1:3000/callback");
    params.append("code_verifier", verifier!);
    params.append("user_agent", userAgent);
    params.append("device_id", deviceID);

    const response = await fetch("http://localhost:2121/api/spotify/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
    }
    
    return response; 
}