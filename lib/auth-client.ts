import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BACKKEND_URL,
    
})


export default authClient;