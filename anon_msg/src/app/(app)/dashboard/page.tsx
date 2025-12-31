"use client";

import MessageCard from '@/components/created/message-card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Message } from '@/model/User.model';
import { acceptMessageSchema } from '@/schemas/acceptMessage';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw, Copy, User as UserIcon } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const { data: session } = useSession();

  const { register, watch, setValue } = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      acceptMessages: false,
    },
  });

  const watchAcceptMessages = watch('acceptMessages');

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((m) => String(m._id) !== messageId)
    );
  };

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const res = await axios.get('/api/is-accepting-messages');
      // Fix: The API likely returns { success: true, isAcceptingMessages: boolean }
      // Based on previous context of is-accepting-messages route
      const isAccepting = res.data?.isAcceptingMessages ?? false;
      setValue('acceptMessages', isAccepting);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      // toast.error(
      //   axiosError.response?.data.message ||
      //     'Error fetching accept messages setting'
      // );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/get-user-messages');
      if (response.data?.success) {
        setMessages(response.data.messages || []);
      } else {
        toast.error(response.data?.message || 'Failed to fetch messages');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message || 'Error fetching messages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!session || !session.user) {
      return;
    }
    fetchMessages();
    fetchAcceptMessages();
  }, [session, fetchMessages, fetchAcceptMessages]);

  const handleSwitchChange = async (acceptMessages: boolean) => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.post('/api/is-accepting-messages', {
        acceptMessages,
      });

      if (response.data?.success) {
        setValue('acceptMessages', acceptMessages);
        toast.success(response.data.message || 'Settings updated successfully');
      } else {
        toast.error(response.data?.message || 'Failed to update settings');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ||
          'Error updating accept messages setting'
      );
    } finally {
      setIsSwitchLoading(false);
    }
  };

  if (!session || !session.user) {
    return <div className="flex justify-center items-center min-h-screen bg-background text-text-primary transition-colors">Please log in to view your dashboard.</div>;
  }

  const username = (session.user as User & { username?: string }).username || (session.user as any).name || '';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const profileUrl = `${origin}/u/${username}`;

  const copyToClipboard = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(profileUrl);
        toast.success('Profile URL copied to clipboard!');
      } else {
        toast.error('Clipboard API not available');
      }
    } catch (err) {
      toast.error('Failed to copy profile URL');
    }
  };

  return (
    <div className="min-h-screen bg-surface-muted py-12 px-4 lg:px-8 font-sans transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-text-primary">User Dashboard</h1>
            <p className="text-text-muted mt-1">Manage your settings and view your messages.</p>
          </div>
          <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm border border-border-muted">
            <UserIcon className="h-4 w-4 text-brand" />
            <span className="font-bold text-sm text-text-secondary">@{username}</span>
          </div>
        </div>

        {/* Link Section */}
        <Card className="border-none shadow-md bg-surface">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-text-primary">Your Unique Link</CardTitle>
            <CardDescription>Share this link to receive anonymous messages.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Input 
                type="text" 
                value={profileUrl} 
                readOnly 
                className="bg-surface-muted border-border focus-visible:ring-focus-ring font-mono text-sm" 
              />
              <Button onClick={copyToClipboard} className="bg-text-primary hover:bg-text-secondary text-text-inverse font-bold shrink-0">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings Section */}
        <Card className="border-none shadow-md bg-surface">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-lg font-bold text-text-primary">Accept Messages</h3>
                <p className="text-sm text-text-muted">Enable or disable receiving new anonymous messages.</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  {...register('acceptMessages')}
                  checked={!!watchAcceptMessages}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSwitchLoading}
                  className="data-[state=checked]:bg-brand"
                />
                {isSwitchLoading && <Loader2 className="w-4 h-4 animate-spin text-text-muted" />}
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="bg-border" />

        {/* Messages Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text-primary">Your Messages</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => fetchMessages()} 
              disabled={loading}
              className="border-border hover:bg-surface-muted text-text-secondary"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-40 bg-surface-muted rounded-xl animate-pulse" />
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-16 bg-surface rounded-2xl border border-dashed border-border">
              <p className="text-text-muted font-medium">No messages yet.</p>
              <p className="text-text-muted/70 text-sm mt-1">Share your link to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {messages.map((m) => (
                <MessageCard
                  key={String(m._id)}
                  message={{ ...m, _id: String(m._id) }}
                  onDelete={handleDeleteMessage}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
