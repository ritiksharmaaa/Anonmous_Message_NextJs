'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent!", {
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen bg-surface-muted font-sans transition-colors py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-black tracking-tighter text-text-primary">
            Get in <span className="text-brand">Touch</span>
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-border shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-brand/10 p-3 rounded-lg text-brand">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">Email Us</h3>
                  <p className="text-text-muted text-sm mb-1">For general inquiries and support</p>
                  <a href="mailto:support@anonmsg.com" className="text-brand font-medium hover:underline">
                    support@anonmsg.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-brand/10 p-3 rounded-lg text-brand">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">Call Us</h3>
                  <p className="text-text-muted text-sm mb-1">Mon-Fri from 9am to 5pm</p>
                  <a href="tel:+1234567890" className="text-brand font-medium hover:underline">
                    +1 (555) 000-0000
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-brand/10 p-3 rounded-lg text-brand">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">Visit Us</h3>
                  <p className="text-text-muted text-sm mb-1">Our HQ</p>
                  <p className="text-text-primary font-medium">
                    123 Innovation Drive<br />
                    Tech City, TC 90210
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-text-primary mb-4">Connect With Us</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/ritiksharmaaa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.652 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.38.202 2.398.099 2.652.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.137 20.19 22 16.436 22 12.012 22 6.484 17.523 2 12 2z"/>
                    </svg>
                    <span className="font-medium text-sm">GitHub</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/ritiksharmaaa/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="font-medium text-sm">LinkedIn</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-border shadow-sm h-fit">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your inquiry..." 
                    className="min-h-[120px]"
                    required 
                  />
                </div>
                <Button type="submit" className="w-full bg-brand hover:bg-brand-hover text-brand-foreground font-bold">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
