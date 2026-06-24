"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


//* this will be the starting point will start github OAuth signIn flow and redirect browser to github consent page
export async function signInWithGithub(formData: FormData) {
    const callback = formData.get("callbackUrl");

    //Todo: fix callback later 
    const result = await auth.api.signInSocial({
        body: {
            provider: "github",
            callbackURL: "/dashboard"
        },
        headers: await headers(),
    });

    if (result.url) {
        redirect(result.url);
    }

}




