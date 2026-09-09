import React from 'react'
import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { BrandLogo } from "@/components/brand-logo";
import { GithubSignInForm } from '@/features/auth/components/github-sign-in-form';
import { siteConfig } from "@/lib/site-config";


export const metadata: Metadata = {
  title: "Sign in",
  description: `Sign in to ${siteConfig.name} with your GitHub account.`,
};

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};


const SignInPage = async({searchParams}:SignInPageProps) => {
    const {callbackUrl} = await searchParams;

  return (
     <Card className="border-border/80 shadow-sm">
      <CardHeader className="items-center text-center">
        <div className="mb-6 flex justify-center pt-2">
          <BrandLogo width={172} height={172} priority />
        </div>
        <CardTitle className="text-base">Welcome back</CardTitle>
        <CardDescription>
          Sign in with GitHub to review and manage your code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldGroup>
            <Field>
              {/* GithubSignInForm component -> will handle the github OAuth signIn flow and redirect browser to github consent page*/}
              <GithubSignInForm callbackUrl={callbackUrl} /> 
              <FieldDescription className="text-center">
                We only request the permissions needed to identify your
                account. You can revoke access anytime from GitHub settings.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  )
}

export default SignInPage