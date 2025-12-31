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
        <div className="min-h-screen bg-surface-muted py-12 px-4 font-sans transition-colors">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-black tracking-tighter text-text-primary mb-2">
                        Discover <span className="text-brand">Channels</span>
                    </h1>
                    <p className="text-text-muted">Find interesting people to message anonymously.</p>
                </div>

                <Card className="border-none shadow-xl bg-surface overflow-hidden">
                    <CardHeader className="border-b border-border-muted pb-6 bg-surface">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-text-muted" />
                            <Input
                                placeholder="Search for users..."
                                className="pl-10 h-12 bg-surface-muted border-border text-text-primary placeholder:text-text-muted focus-visible:ring-focus-ring focus-visible:border-brand rounded-xl transition-all"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[600px]">
                            <div className="flex flex-col divide-y divide-border-muted">
                                {suggestedChannels.map((channel) => (
                                    <Link
                                        key={channel.id}
                                        href={`/u/${channel.username}`}
                                        className="group flex items-center gap-4 p-6 transition-all hover:bg-surface-muted cursor-pointer"
                                    >
                                        <Avatar className="h-14 w-14 border-2 border-surface shadow-sm group-hover:border-brand/20 transition-colors">
                                            <AvatarImage src={channel.avatar} alt={channel.username} />
                                            <AvatarFallback className="bg-brand/10 text-brand font-bold text-lg">
                                                {channel.displayName.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        
                                        <div className="flex flex-1 flex-col justify-center overflow-hidden">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-bold text-lg text-text-primary truncate group-hover:text-brand transition-colors">
                                                    {channel.displayName}
                                                </span>
                                                <span className="text-xs font-medium text-text-muted whitespace-nowrap ml-2">
                                                    {channel.timestamp}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-text-muted truncate pr-4 group-hover:text-text-secondary">
                                                    {channel.lastMessage}
                                                </span>
                                                {channel.unread > 0 && (
                                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground shadow-sm">
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