"use client";
import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";



// Mock data for suggested channels
const suggestedChannels = [
    {
        id: 1,
        username: "mystery_user",
        displayName: "Mystery User",
        lastMessage: "Hey! Send me an anonymous message.",
        timestamp: "10:30 AM",
        avatar: "https://github.com/shadcn.png",
        unread: 2,
    },
    {
        id: 2,
        username: "secret_confessions",
        displayName: "Secret Confessions",
        lastMessage: "I have a secret to tell...",
        timestamp: "Yesterday",
        avatar: "",
        unread: 0,
    },
    {
        id: 3,
        username: "anon_feedback",
        displayName: "Anon Feedback",
        lastMessage: "Waiting for your honest opinion.",
        timestamp: "Yesterday",
        avatar: "",
        unread: 5,
    },
    {
        id: 4,
        username: "night_owl",
        displayName: "Night Owl",
        lastMessage: "Who is up right now?",
        timestamp: "2 days ago",
        avatar: "",
        unread: 0,
    },
];

export default function SuggestAnonChannelPage() {
    return (
        <div className="min-h-screen bg-zinc-50/50 py-12 px-4 font-sans selection:bg-red-600 selection:text-white">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-black tracking-tighter text-black mb-2">
                        Discover <span className="text-red-600">Channels</span>
                    </h1>
                    <p className="text-zinc-500">Find interesting people to message anonymously.</p>
                </div>

                <Card className="border-none shadow-xl bg-white overflow-hidden">
                    <CardHeader className="border-b border-zinc-100 pb-6 bg-white">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                            <Input
                                placeholder="Search for users..."
                                className="pl-10 h-12 bg-zinc-50 border-zinc-200 text-black placeholder:text-zinc-400 focus-visible:ring-red-600 focus-visible:border-red-600 rounded-xl transition-all"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[600px]">
                            <div className="flex flex-col divide-y divide-zinc-100">
                                {suggestedChannels.map((channel) => (
                                    <Link
                                        key={channel.id}
                                        href={`/u/${channel.username}`}
                                        className="group flex items-center gap-4 p-6 transition-all hover:bg-zinc-50 cursor-pointer"
                                    >
                                        <Avatar className="h-14 w-14 border-2 border-white shadow-sm group-hover:border-red-100 transition-colors">
                                            <AvatarImage src={channel.avatar} alt={channel.username} />
                                            <AvatarFallback className="bg-red-50 text-red-600 font-bold text-lg">
                                                {channel.displayName.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        
                                        <div className="flex flex-1 flex-col justify-center overflow-hidden">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-bold text-lg text-zinc-900 truncate group-hover:text-red-600 transition-colors">
                                                    {channel.displayName}
                                                </span>
                                                <span className="text-xs font-medium text-zinc-400 whitespace-nowrap ml-2">
                                                    {channel.timestamp}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-zinc-500 truncate pr-4 group-hover:text-zinc-700">
                                                    {channel.lastMessage}
                                                </span>
                                                {channel.unread > 0 && (
                                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white shadow-sm shadow-red-200">
                                                        {channel.unread}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}