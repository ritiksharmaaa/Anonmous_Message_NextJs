import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shield, Users, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-muted font-sans transition-colors">
      {/* Hero Section */}
      <div className="bg-surface border-b border-border-muted py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-black tracking-tighter text-text-primary">
            We believe in <span className="text-brand">Honest</span> Conversations.
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            anonmsg was built to provide a safe space for people to share their thoughts, feedback, and confessions without the fear of judgment.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border-muted text-center space-y-4">
            <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto text-brand">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Privacy First</h3>
            <p className="text-text-secondary">
              We don't track your IP, we don't sell your data. Your anonymity is our top priority.
            </p>
          </div>
          <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border-muted text-center space-y-4">
            <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto text-brand">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Community Driven</h3>
            <p className="text-text-secondary">
              Built for creators, friends, and communities to engage in open dialogue.
            </p>
          </div>
          <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border-muted text-center space-y-4">
            <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto text-brand">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Instant & Simple</h3>
            <p className="text-text-secondary">
              No complex signups for senders. Just click a link and share your message.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        <h2 className="text-3xl font-bold text-text-primary">Our Story</h2>
        <div className="prose prose-zinc max-w-none text-text-secondary leading-relaxed space-y-4">
          <p>
            Started in 2025, anonmsg began as a simple idea: What if we could remove the social pressure from communication? 
            In a world of curated profiles and public likes, we wanted to bring back the authenticity of raw, unfiltered human connection.
          </p>
          <p>
            Today, thousands of users trust anonmsg to receive constructive feedback, heartwarming messages, and sometimes, just a good laugh. 
            We are a small team of passionate developers dedicated to keeping the internet a little more interesting.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-zinc-900 text-white py-20 px-4 text-center mt-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold">Ready to start your journey?</h2>
          <p className="text-zinc-400">Join thousands of others who are already using anonmsg.</p>
          <div className="flex justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="bg-brand hover:bg-brand-hover text-brand-foreground font-bold">
                Get Started
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-zinc-700 text-white hover:bg-zinc-800 hover:text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
