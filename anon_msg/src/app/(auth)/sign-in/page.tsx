
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/signInSchema";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { signIn } from "next-auth/react";

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.username,
        password: data.password,
      });

      // also chech her because here we  redirect is also happing from the backend as well front end here we prefrece frint end , bu the code to stop backend redirect request?url than replace with fronend replvement .
      if (result?.ok) {
        toast.success("Sign in successful!");
        router.replace("/dashboard");
      } else {
        toast.error(result?.error || "Sign in failed");
        // also check whether the error is from credition or google or github
      }
    } catch (error) {
      const nextAuthError = error as Error;
      console.error("Error during sign in", nextAuthError);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded drop-shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-600 mt-2 mb-3 font-bold">Access your account</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username or email " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <span className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M44.5 20H24V28.5H35.7C34.2 33.1 29.7 36 24 36C16.8 36 10.5 29.7 10.5 22.5C10.5 15.3 16.8 9 24 9C27.1 9 29.9 10.1 32.1 12L38.1 6C34.3 2.7 29.4 0.5 24 0.5C11.5 0.5 1.5 10.5 1.5 22.5C1.5 34.5 11.5 44.5 24 44.5C36.5 44.5 46.5 34.5 46.5 22.5C46.5 21.1 46.3 19.7 46 18.3L44.5 20Z" fill="#FFC107"/><path d="M6.3 14.7L12.1 18.6C13.7 15.2 18.4 12.1 24 12.1C27.1 12.1 29.9 13.2 32.1 15.1L38.1 9.1C34.3 5.8 29.4 3.6 24 3.6C16.8 3.6 10.5 9.9 10.5 17.1C10.5 19.1 11.1 21 12.1 22.7L6.3 14.7Z" fill="#FF3D00"/><path d="M24 44.5C29.4 44.5 34.3 42.3 38.1 39L32.1 33C29.9 34.9 27.1 36 24 36C18.4 36 13.7 32.9 12.1 29.5L6.3 35.3C11.1 41.9 18.4 44.5 24 44.5Z" fill="#4CAF50"/><path d="M46 18.3L44.5 20C44.5 20 44.5 20 44.5 20H24V28.5H35.7C34.2 33.1 29.7 36 24 36C27.1 36 29.9 34.9 32.1 33L38.1 39C41.1 36.2 43.1 32.6 44.1 28.5C44.5 27.1 44.5 25.7 44.5 24.5C44.5 22.5 44.5 20 44.5 20Z" fill="#1976D2"/></g></svg>
                Continue with Google
              </span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
              <span className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.652 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.38.202 2.398.099 2.652.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.137 20.19 22 16.436 22 12.012 22 6.484 17.523 2 12 2z" fill="#181717"/></svg>
                Continue with GitHub
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
