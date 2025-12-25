"use client";
// hard code issue fix later 

import MessageCard from '@/components/created/message-card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Message } from '@/model/User.model';
import { acceptMessageSchema } from '@/schemas/acceptMessage';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { User } from 'next-auth';
import { useSession  } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';


/**
 * State variable `loading` is used to indicate whether the user's messages are currently being fetched.
 * It is set to `true` before the fetch operation begins in `fetchMessages`, and set to `false` once the operation completes.
 * This state controls the loading indicator in the messages section of the dashboard.
 *
 * State variable `setLoading` is the setter for `loading`, used to update its value during the fetch lifecycle.
 *
 * State variable `isSwitchLoading` is used to indicate whether the "Accept anonymous messages" setting is being updated or fetched.
 * It is set to `true` before the fetch or update operation begins in `fetchAcceptMessages` and `onSwitchChange`, and set to `false` once the operation completes.
 * This state disables the switch input and shows a loading indicator while the setting is being processed.
 *
 * State variable `setIsSwitchLoading` is the setter for `isSwitchLoading`, used to update its value during the fetch or update lifecycle.
 */
const Page = () =>  {
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
      const res = await axios.get('/api/accept-messages');
      const acceptMessages =
        res.data?.isAcceptingMessage?.acceptMessages ?? false;
      setValue('acceptMessages', acceptMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ||
          'Error fetching accept messages setting'
      );
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
    // We return early if session or session.user is not available.
    // This prevents fetching messages and settings before authentication.
    // Also, loading and isSwitchLoading are true here, so the user can't interact with the toggle or see messages yet.
    if (!session || !session.user) {
      return;
    }
    fetchMessages();
    fetchAcceptMessages();
  }, [session, fetchMessages, fetchAcceptMessages]);

  const handleSwitchChange = async (acceptMessages: boolean) => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.post('/api/accept-messages', {
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
  // NOTE: access to `session.user` and `window` must happen after
  // verifying this is running in the client and the session exists.
  if (!session || !session.user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  // Compute username and profile URL only after session is available
  // Fixes: crash from destructuring undefined `session.user`, avoids
  // using `window` during SSR, and prevents clipboard write on render.
  const username = (session.user as User & { username?: string }).username || (session.user as any).name || '';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const profileUrl = `${origin}/u/${username}`;

  // Make copy action a function to call on button click. Previously the
  // code executed `navigator.clipboard.writeText` during render which:
  //  - attempted clipboard write on every render
  //  - assigned a Promise to `copyToClipboard` instead of a function
  //  - caused the button's `onClick` prop to receive a non-function
  //    (leading to the red error you saw)
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
    <div style={{ padding: 16 }}>
      <h1>Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-lg-font-semibold mb-2">Copy Your unique Link </h2>
        <div className="flex itmes-denter">
          <input type="text" value={profileUrl} readOnly className='input input-bordered w-full p-2 mr-2' />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>
      <div className="mv-4">

   
      <section style={{ marginBottom: 16 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Switch
            {...register('acceptMessages')}
            checked={!!watchAcceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          Accept anonymous messages
          {isSwitchLoading ? (
            <Loader2 className="w-4 h-4 ml-2 animate-spin" />
          ) : (
            <RefreshCcw className="w-4 h-4 ml-2 cursor-pointer" />
          )}
        </label>
      </section>
      <Separator className="my-4" />
    

      <section>
        <h2>Your messages</h2>
        {loading ? (
          <div>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div>No messages yet.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((m) => ( 
              <MessageCard
                key={String(m._id)}
                message={{ ...m, _id: String(m._id) }}
                onDelete={handleDeleteMessage}
              />
            ))}
          </div>
        )}
      </section>
    </div>
       </div>
  );
};

export default Page;
