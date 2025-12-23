
export const authFlow = (clientId: string, challenge: string, redirect: string) => {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirect);
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const authenticateUser = async (clientId: string, accessCode: string, verifier: string, deviceID: string, redirect: string) => {
    const userAgent = navigator.userAgent;
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", accessCode);
    params.append("redirect_uri", redirect);
    params.append("code_verifier", verifier!);
    params.append("user_agent", userAgent);
    params.append("device_id", deviceID);

    const response = await fetch("http://localhost:2121/api/auth/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
    }
    
    return response; 
}