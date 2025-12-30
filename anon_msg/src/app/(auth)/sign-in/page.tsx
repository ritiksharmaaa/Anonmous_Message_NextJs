
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
import Link from "next/link";
import { Lock, User, ArrowRight, MessageSquare } from "lucide-react";
import Logo from "@/components/created/logo";

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

      if (result?.ok) {
        toast.success("Sign in successful!");
        router.replace("/dashboard");
      } else {
        toast.error(result?.error || "Sign in failed");
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
    <div className="min-h-screen flex font-sans selection:bg-red-600 selection:text-white">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Logo size="lg" variant="dark" />
          
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-black text-white leading-tight">
                Welcome back to<br />
                <span className="text-red-500">Anonymous</span> Messaging
              </h2>
              <p className="text-zinc-400 mt-4 text-lg leading-relaxed max-w-md">
                Sign in to continue receiving honest feedback and anonymous messages from your community.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 border-2 border-zinc-900 flex items-center justify-center">
                    <span className="text-xs font-bold text-zinc-300">{String.fromCharCode(65 + i)}</span>
                  </div>
                ))}
              </div>
              <p className="text-zinc-400 text-sm">
                <span className="text-white font-bold">10,000+</span> active users
              </p>
            </div>
          </div>
          
          <p className="text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} anonmsg. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-zinc-50 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10 flex justify-center">
            <Logo size="lg" variant="light" />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-black tracking-tight text-zinc-900">Sign in to your account</h1>
              <p className="text-zinc-500 mt-2 text-sm">Enter your credentials to continue</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-700 font-medium text-sm">Username or Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                          <Input 
                            placeholder="Enter your username or email" 
                            className="pl-10 bg-zinc-50 border-zinc-200 focus-visible:ring-red-600 focus-visible:ring-offset-0 h-12 rounded-xl text-sm" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-zinc-700 font-medium text-sm">Password</FormLabel>
                        <Link href="#" className="text-xs text-red-600 hover:text-red-700 font-medium">
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            className="pl-10 bg-zinc-50 border-zinc-200 focus-visible:ring-red-600 focus-visible:ring-offset-0 h-12 rounded-xl text-sm" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-xl transition-all shadow-sm shadow-red-600/20 group"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Sign In
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-8">
              <div className="flex items-center gap-4">
                <div className="flex-grow h-px bg-zinc-200" />
                <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Or</span>
                <div className="flex-grow h-px bg-zinc-200" />
              </div>
              
              <div className="flex flex-col gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 rounded-xl border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 text-zinc-700 font-medium transition-all"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                >
                  <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 rounded-xl border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 text-zinc-700 font-medium transition-all"
                  onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                >
                  <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.652 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.38.202 2.398.099 2.652.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.137 20.19 22 16.436 22 12.012 22 6.484 17.523 2 12 2z"/>
                  </svg>
                  Continue with GitHub
                </Button>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-zinc-500 mt-8">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-red-600 hover:text-red-700 font-bold hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
