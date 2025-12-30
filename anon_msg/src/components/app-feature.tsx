'use client';

import React from 'react';
import Image from 'next/image';

const features = [
  {
    title: "Say Anything",
    text: "Share text, voice messages, photos, videos, GIFs and files for free. Express yourself without limits, completely anonymously.",
    imgSrc: "/features/say-anything.svg", 
    alt: "Chat bubbles with media"
  },
  {
    title: "Speak Freely",
    text: "Send messages to anyone without revealing your identity. True freedom of expression starts with anonymity.",
    imgSrc: "/features/speak-freely.svg",
    alt: "Video call illustration"
  },
  {
    title: "Make Privacy Stick",
    text: "Your privacy is protected with end-to-end encryption. Only you control who sees your identity.",
    imgSrc: "/features/privacy-stick.svg",
    alt: "Privacy and stickers illustration"
  },
  {
    title: "Get Together with Groups",
    text: "Receive anonymous messages from your community. Share your unique link and let people connect with you.",
    imgSrc: "/features/groups.svg",
    alt: "Group chat illustration"
  }
];

export default function AppFeatures() {
  return (
    <section className="bg-zinc-50 py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-red-600 font-bold text-sm uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-zinc-900">
            Everything you need for <span className="text-red-600">anonymous</span> messaging
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            Built with privacy at its core. Share your thoughts without revealing who you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-12 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-shadow duration-300 border border-zinc-100"
            >
              <div className="mb-8 w-full flex justify-center min-h-[240px] items-center">
                <Image 
                  src={feature.imgSrc} 
                  alt={feature.alt}
                  width={280}
                  height={240}
                  className="max-w-full h-auto max-h-[260px] object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-zinc-500 text-lg leading-relaxed max-w-[85%]">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}