"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Check, X, User, Mail, Lock, ArrowRight, MessageSquare, Shield, Zap, Eye } from "lucide-react";
import Logo from "@/components/created/logo";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounceUsername = useDebounceCallback(setUsername, 300);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!username || username.length < 3) {
      setUserMessage("");
      return;
    }

    let isCancelled = false;

    const checkUsername = async () => {
      setIsCheckingUsername(true);
      try {
        const res = await axios.get(`/api/unique-username-check`, {
          params: { username: username },
        });
        const data = res.data;
        if (!isCancelled) {
          if (data.success === true) {
            setUserMessage(data.message);
          } else {
            setUserMessage("Username is taken");
          }
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        if (!isCancelled) {
          setUserMessage(
            axiosError.response?.data.message || "Error checking username"
          );
        }
      } finally {
        if (!isCancelled) {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUsername();

    return () => {
      isCancelled = true;
    };
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post("/api/sign-up", data);
      const resData = res.data as ApiResponse;
      if (resData.success) {
        toast.success(resData.message);
        router.replace(`/verify/${username}`);
        setIsSubmitting(false);
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "An error occurred during sign up."
      );
      setIsSubmitting(false);
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
                Start receiving<br />
                <span className="text-red-500">Anonymous</span> Messages
              </h2>
              <p className="text-zinc-400 mt-4 text-lg leading-relaxed max-w-md">
                Create your free account and get your unique link to share with friends, followers, and communities.
              </p>
            </div>
            
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-red-500">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-white font-semibold">100% Anonymous</p>
                  <p className="text-zinc-500 text-sm">Senders stay completely hidden</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-red-500">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="text-white font-semibold">Instant Setup</p>
                  <p className="text-zinc-500 text-sm">Get your link in under 60 seconds</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-red-500">
                  <Eye size={20} />
                </div>
                <div>
                  <p className="text-white font-semibold">Full Control</p>
                  <p className="text-zinc-500 text-sm">Accept or pause messages anytime</p>
                </div>
              </div>
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
              <h1 className="text-2xl font-black tracking-tight text-zinc-900">Create your account</h1>
              <p className="text-zinc-500 mt-2 text-sm">Start your anonymous journey today</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-700 font-medium text-sm">
                        Username
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                          <Input
                            placeholder="Choose a unique username"
                            className="pl-10 pr-10 bg-zinc-50 border-zinc-200 focus-visible:ring-red-600 focus-visible:ring-offset-0 h-12 rounded-xl text-sm"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              debounceUsername(e.target.value);
                            }}
                          />
                          {isCheckingUsername && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-zinc-400" />
                          )}
                          {!isCheckingUsername && userMessage === "Username is unique" && (
                            <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
                          )}
                          {!isCheckingUsername && userMessage && userMessage !== "Username is unique" && (
                            <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </FormControl>
                      {userMessage && (
                        <p
                          className={`text-xs font-medium mt-1.5 ${
                            userMessage === "Username is unique"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {userMessage}
                        </p>
                      )}
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-700 font-medium text-sm">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                          <Input
                            type="email"
                            placeholder="Enter your email"
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
                      <FormLabel className="text-zinc-700 font-medium text-sm">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                          <Input
                            type="password"
                            placeholder="Create a strong password"
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
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-xl transition-all shadow-sm shadow-red-600/20 group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Create Account
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>

            <p className="text-xs text-zinc-500 text-center mt-6">
              By signing up, you agree to our{" "}
              <Link href="/terms-of-service" className="text-red-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="text-red-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          <p className="text-center text-sm text-zinc-500 mt-8">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-red-600 hover:text-red-700 font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}