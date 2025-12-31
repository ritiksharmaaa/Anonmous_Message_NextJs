"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { Loader2, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component, if not use Input or create one
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";

// Dummy data for suggestions
const DUMMY_SUGGESTIONS = [
  "What's a hobby you've always wanted to pick up but never did?",
  "If you could have dinner with any historical figure, who would it be?",
  "What's a simple thing that makes you happy?",
  "What is your favorite travel destination?",
  "What is the best advice you have ever received?",
];

export default function SendMessagePage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>(DUMMY_SUGGESTIONS.slice(0, 3));
  const [isAcceptingMessages, setIsAcceptingMessages] = useState(false);
  const [isCheckingAcceptance, setIsCheckingAcceptance] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const messageContent = form.watch("content");

  const checkAcceptance = async () => {
    setIsCheckingAcceptance(true);
    try {
      const response = await axios.get<ApiResponse>(
        `/api/check-acceptance?username=${username}`
      );
      setIsAcceptingMessages(response.data.isAcceptingMessages as boolean);
      setHasChecked(true);
      if (response.data.isAcceptingMessages) {
        toast.success("User is accepting messages!");
      } else {
        toast.error("User is not accepting messages right now.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "Failed to check user status"
      );
    } finally {
      setIsCheckingAcceptance(false);
    }
  };

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const fetchSuggestedMessages = async () => {
    setIsSuggestLoading(true);
    try {
      // Simulate API delay or fetch from actual API if needed
      // const response = await axios.post('/api/suggest-messages');
      // setSuggestedMessages(parseStringMessages(response.data.message));
      
      // Using dummy data as requested
      // Shuffle or rotate dummy data
      const shuffled = [...DUMMY_SUGGESTIONS].sort(() => 0.5 - Math.random());
      setSuggestedMessages(shuffled.slice(0, 3));
      toast.success("New suggestions loaded!");
    } catch (error) {
      toast.error("Failed to fetch suggestions");
    } finally {
      setIsSuggestLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-user-messages", {
        username,
        content: data.content,
      });

      if (response.data.success) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        toast.error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "Failed to send message. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-muted flex flex-col items-center justify-center p-4 font-sans transition-colors">
      <div className="w-full max-w-2xl space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-text-primary">
            Public Profile Link
          </h1>
          <p className="text-text-muted">
            Send a secret message to <span className="font-bold text-brand">@{username}</span>
          </p>
        </div>

        {/* Message Form Card */}
        <Card className="border-none shadow-xl bg-surface">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Send Anonymous Message</CardTitle>
            <CardDescription>
              Your identity will remain hidden. Be kind and respectful.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!hasChecked ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-6">
                <p className="text-text-secondary text-center">
                  Check if @{username} is accepting anonymous messages right now.
                </p>
                <Button 
                  onClick={checkAcceptance} 
                  disabled={isCheckingAcceptance}
                  className="w-full md:w-auto bg-brand hover:bg-brand-hover text-brand-foreground font-bold"
                >
                  {isCheckingAcceptance ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Check Status"
                  )}
                </Button>
              </div>
            ) : !isAcceptingMessages ? (
              <div className="p-6 bg-status-error/10 border border-status-error/20 rounded-lg text-center">
                <p className="text-status-error font-medium">
                  This user is currently not accepting messages.
                </p>
                <Button variant="outline" onClick={() => setHasChecked(false)} className="mt-4 border-status-error/30 text-status-error hover:bg-status-error/10">Check Again</Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Type your anonymous message here..."
                            className="resize-none min-h-[150px] bg-surface-muted border-border focus-visible:ring-focus-ring"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isLoading || !messageContent}
                      className="bg-text-primary hover:bg-text-secondary text-surface font-bold py-2 px-6 rounded-lg transition-all"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>

        {/* Suggestions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-secondary">Need inspiration?</h3>
            <Button 
              variant="outline" 
              onClick={fetchSuggestedMessages}
              disabled={isSuggestLoading}
              className="text-xs h-8 border-border hover:bg-surface-muted"
            >
              {isSuggestLoading ? (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              ) : (
                <Sparkles className="h-3 w-3 mr-1" />
              )}
              Suggest Messages
            </Button>
          </div>
          
          <div className="grid gap-3">
            {suggestedMessages.map((message, index) => (
              <button
                key={index}
                onClick={() => handleMessageClick(message)}
                className="text-left p-4 rounded-xl bg-surface border border-border hover:border-brand/30 hover:bg-brand/5 transition-all shadow-sm text-sm text-text-secondary hover:text-text-primary font-medium"
              >
                {message}
              </button>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Footer CTA */}
        <div className="text-center space-y-4">
          <p className="text-text-muted text-sm">
            Want to receive anonymous messages too?
          </p>
          <Link href="/sign-up">
            <Button variant="outline" className="border-text-primary text-text-primary hover:bg-surface-muted font-bold">
              Create Your Own Board
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 

