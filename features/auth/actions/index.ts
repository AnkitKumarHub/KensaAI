"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {DEFAULT_AUTH_CALLBACK, getSafeCallbackPath, SIGN_IN_PATH} from "../utils"

//* this will be the starting point will start github OAuth signIn flow and redirect browser to github consent page
export async function signInWithGithub(formData: FormData) {
    const callback = formData.get("callbackUrl");

    const redirectTo = getSafeCallbackPath(
        typeof callback === "string" ? callback : null
    )
    const result = await auth.api.signInSocial({
        body: {
            provider: "github",
            callbackURL: redirectTo //after github consent page is completed, github will redirect browser to this callbackURL
        },
        headers: await headers(),
    });

    if (result.url) {
        redirect(result.url);
    }

}

// this function is used to get the data of currently logged in User at server side
export async function getServerSession(){
    return auth.api.getSession({
        headers: await headers()
    })
}

// if the user is not logged in, redirect to SIGN_IN_PATH
export async function requireAuth(redirectTo = SIGN_IN_PATH){
    const session = await getServerSession();
    if(!session){
        redirect(redirectTo);
    }
    return session;
}

// if the user is logged in, redirect to DEFAULT_AUTH_CALLBACK
export async function requireUnauth(redirectTo = DEFAULT_AUTH_CALLBACK){
    const session = await getServerSession();
    if(session){
        redirect(redirectTo);
    }
}
