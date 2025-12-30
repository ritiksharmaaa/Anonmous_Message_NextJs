'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Send, Shield } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isOwn: boolean;
  time: string;
}

export default function PhoneMockup() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey, is this really anonymous? 🤔", isOwn: false, time: "2:41 PM" },
    { id: 2, text: "100% anonymous. No one can see who sent this!", isOwn: true, time: "2:42 PM" },
  ]);
  const [showTyping, setShowTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const additionalMessages: Message[] = [
    { id: 3, text: "That's actually amazing 🔥", isOwn: false, time: "2:43 PM" },
    { id: 4, text: "Right? Share your link and see what people really think!", isOwn: true, time: "2:44 PM" },
  ];

  useEffect(() => {
    if (currentMessageIndex >= additionalMessages.length) return;

    const typingTimer = setTimeout(() => {
      setShowTyping(true);
    }, 3000);

    const messageTimer = setTimeout(() => {
      setShowTyping(false);
      setMessages(prev => [...prev, additionalMessages[currentMessageIndex]]);
      setCurrentMessageIndex(prev => prev + 1);
    }, 5000);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(messageTimer);
    };
  }, [currentMessageIndex]);

  return (
    <div className="relative">
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 via-red-600/10 to-transparent rounded-[4rem] blur-2xl" />
      
      {/* Phone Frame */}
      <div className="relative w-[280px] h-[580px] bg-zinc-900 rounded-[3rem] p-2 shadow-2xl ring-1 ring-white/10">
        {/* Inner Screen */}
        <div className="w-full h-full bg-zinc-950 rounded-[2.5rem] overflow-hidden flex flex-col">
          
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 py-2 text-[10px] text-zinc-400">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.33 4.67L18.67 11H5.33l6.34-6.33a.5.5 0 01.66 0z"/>
              </svg>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.24 4.24 0 00-6 0zm-4-4l2 2a7.07 7.07 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              <div className="w-6 h-2.5 border border-zinc-400 rounded-sm relative">
                <div className="absolute inset-0.5 right-1 bg-green-500 rounded-sm" />
              </div>
            </div>
          </div>

          {/* Dynamic Island / Notch */}
          <div className="flex justify-center -mt-1">
            <div className="w-24 h-6 bg-black rounded-full" />
          </div>

          {/* Chat Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
              <MessageSquare size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white text-sm font-semibold">Anonymous</h4>
              <div className="flex items-center gap-1 text-[10px] text-green-500">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Online
              </div>
            </div>
            <div className="flex items-center gap-1 text-zinc-500">
              <Shield size={14} />
              <span className="text-[10px]">E2E</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                    msg.isOwn
                      ? 'bg-red-600 text-white rounded-br-md'
                      : 'bg-zinc-800 text-white rounded-bl-md'
                  }`}
                >
                  <p className="text-xs leading-relaxed">{msg.text}</p>
                  <p className={`text-[9px] mt-1 ${msg.isOwn ? 'text-red-200' : 'text-zinc-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {showTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-zinc-800 rounded-full px-4 py-2.5 flex items-center">
                <span className="text-zinc-500 text-xs">Type anonymously...</span>
              </div>
              <button className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-32 h-1 bg-zinc-700 rounded-full" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-red-600/10 rounded-full blur-xl" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-red-600/10 rounded-full blur-xl" />
    </div>
  );
}
