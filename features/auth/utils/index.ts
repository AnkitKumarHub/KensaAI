export const LANDING_PAGE_PATH = "/";
export const SIGN_IN_PATH = "/sign-in";
export const DEFAULT_AUTH_CALLBACK = "/dashboard";

//* this function is used to get the safe callback path for the user
export function getSafeCallbackPath(
    callbackUrl: string | null | undefined 
): string {

    if(callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")){
        return callbackUrl;
    }
    
    return DEFAULT_AUTH_CALLBACK;
}

