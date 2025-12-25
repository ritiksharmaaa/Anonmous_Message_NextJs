import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemedAutoCarousel } from "@/components/created/carousl";



import {
  ShieldAlert,
  UserX,
  Ghost,
  Lock,
  ArrowRight,
  MessageCircle
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-red-600 selection:text-white">

      {/* --- HERO SECTION --- 
          Area: Primary conversion. 
          Style: White Major, Red Action buttons.
      */}
      {/* implemtnt the crousel from the shadcb */}




      <main className="flex flex-col items-center justify-center px-6 py-4 lg:py-12 border-b border-zinc-100">
        <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-8">
            {/* <Image
              className="dark:invert mb-4"
              src="/next.svg"
              alt="anonmsg logo"
              width={120}
              height={24}
              priority
            /> */}

            <Badge className="bg-red-100 text-red-600 hover:bg-red-100 border-none rounded-full px-4 py-1 font-bold">
              Secure & Anonymous
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none text-black">
              Message without <br />
              <span className="text-red-600">Trace.</span>
            </h1>

            <p className="max-w-md text-lg leading-8 text-zinc-600">
              The starting point for private conversations. No phone numbers, no tracking, just pure anonymity for <strong>anonmsg</strong> users.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="bg-red-600 hover:bg-black text-white rounded-full px-10 h-14 text-lg font-bold transition-all">
                Start Anonymous Chat
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-black text-black px-10 h-14 text-lg font-bold hover:bg-zinc-50 transition-all">
                Learn More
              </Button>
            </div>
          </div>

          {/* Device Mockup (WhatsApp Landing Style) */}
          <div className="hidden lg:flex justify-center relative">
            <div className="w-[300px] h-[600px] bg-black rounded-[3rem] border-10 border-zinc-900 shadow-2xl relative overflow-hidden ring-4 ring-red-600/5">
              <div className="p-6 pt-16 space-y-4">
                <div className="bg-zinc-800 text-white p-3 rounded-2xl rounded-tl-none text-xs w-4/5">
                  "Is this actually anonymous?"
                </div>
                <div className="bg-red-600 text-white p-3 rounded-2xl rounded-tr-none text-xs w-4/5 ml-auto">
                  "100%. No logs, no IDs."
                </div>
              </div>
              <div className="absolute bottom-10 left-0 right-0 px-6">
                <div className="h-10 bg-zinc-800 rounded-full flex items-center px-4 text-[10px] text-zinc-500">
                  Type anonymously...
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- FEATURES SECTION --- 
          Area: Core value props. 
          Style: White Major, Black minor text.
      */}
      <ThemedAutoCarousel />

      <section className="py-24 px-6 bg-zinc-50/50">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-sm bg-white hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <UserX className="text-red-600" size={32} />
                <h3 className="text-xl font-bold">Identity Free</h3>
                <p className="text-zinc-500 text-sm">only  email is required to start a conversation.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <Ghost className="text-red-600" size={32} />
                <h3 className="text-xl font-bold">Ghost Mode</h3>
                <p className="text-zinc-500 text-sm">Messages vanish instantly after they are read by the recipient.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <Lock className="text-red-600" size={32} />
                <h3 className="text-xl font-bold">End-to-End</h3>
                <p className="text-zinc-500 text-sm">Only you and the recipient hold the keys to the conversation.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- CTA / FOOTER --- 
          Area: Final closing. 
          Style: Black background, Red highlights.
      */}
      <footer className="bg-black text-white py-20 px-6">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black italic tracking-tighter">
              ANON<span className="text-red-600">MSG</span>
            </h2>
            <p className="text-zinc-500 mt-2">Privacy isn't a feature, it's the foundation.</p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="text-sm font-bold hover:text-red-600 transition-colors">Documentation</a>
            <a href="#" className="text-sm font-bold hover:text-red-600 transition-colors">Security</a>
            <a href="#" className="text-sm font-bold hover:text-red-600 transition-colors">GitHub</a>
          </div>
        </div>
        <div className="container max-w-6xl mx-auto mt-12 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-600">
          © 2025 anonmsg Application. Built with Next.js 16.
        </div>
      </footer>

    </div>
  );
}