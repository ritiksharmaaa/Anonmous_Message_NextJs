// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemedAutoCarousel } from "@/components/created/carousl";
import PhoneMockup from "@/components/created/phone-mockup";
import Link from "next/link";



import {
  UserX,
  Ghost,
  Lock,
} from "lucide-react";
import AppFeatures from "@/components/app-feature";

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
              <Link href="/u/suggest-anon-channel">
              <Button size="lg" className="bg-red-600 hover:bg-black text-white rounded-full px-10 h-14 text-lg font-bold transition-all">

                Start Anonymous Chat
              </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-full border-black text-black px-10 h-14 text-lg font-bold hover:bg-zinc-50 transition-all">
                Learn More
              </Button>
            </div>
          </div>

          {/* Device Mockup */}
          <div className="hidden lg:flex justify-center relative">
            <PhoneMockup />
          </div>
        </div>
      </main>

      {/* feture section */}
      <AppFeatures />

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
    </div>
  );
}