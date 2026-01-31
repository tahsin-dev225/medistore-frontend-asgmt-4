
import { createAuthClient } from "better-auth/react"

console.log(process.env.BACKEND_URL,'kahy');

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BACKEND_URL
})