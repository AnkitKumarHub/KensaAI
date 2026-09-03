import { requireAuth } from "@/features/auth/actions";
import React from "react";

export default async function ProtectedLayout({
    children,
}:{
    children: React.ReactNode;
}){
    await requireAuth(); // agar user loggedIn/authenticated hai tbhi allow karo yeh access karne ke liye
    return (
        <div className="min-h-svh">
            {children}
        </div>
    )
}