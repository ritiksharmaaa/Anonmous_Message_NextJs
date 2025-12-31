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
    <div className="flex min-h-screen flex-col bg-background font-sans transition-colors">

      {/* --- HERO SECTION --- 
          Area: Primary conversion. 
          Style: White Major, Red Action buttons.
      */}
      {/* implemtnt the crousel from the shadcb */}




      <main className="flex flex-col items-center justify-center px-6 py-4 lg:py-12 border-b border-border">
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

            <Badge className="bg-brand-muted text-brand hover:bg-brand-muted border-none rounded-full px-4 py-1 font-bold">
              Secure & Anonymous
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none text-text-primary">
              Message without <br />
              <span className="text-brand">Trace.</span>
            </h1>

            <p className="max-w-md text-lg leading-8 text-text-secondary">
              The starting point for private conversations. No phone numbers, no tracking, just pure anonymity for <strong>anonmsg</strong> users.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/u/suggest-anon-channel">
              <Button size="lg" className="bg-brand hover:bg-text-primary text-brand-foreground rounded-full px-10 h-14 text-lg font-bold transition-all">

                Start Anonymous Chat
              </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-full border-text-primary text-text-primary px-10 h-14 text-lg font-bold hover:bg-surface-muted transition-all">
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

      <section className="py-24 px-6 bg-surface-muted">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-sm bg-surface hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <UserX className="text-brand" size={32} />
                <h3 className="text-xl font-bold text-text-primary">Identity Free</h3>
                <p className="text-text-muted text-sm">only  email is required to start a conversation.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-surface hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <Ghost className="text-brand" size={32} />
                <h3 className="text-xl font-bold text-text-primary">Ghost Mode</h3>
                <p className="text-text-muted text-sm">Messages vanish instantly after they are read by the recipient.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-surface hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <Lock className="text-brand" size={32} />
                <h3 className="text-xl font-bold text-text-primary">End-to-End</h3>
                <p className="text-text-muted text-sm">Only you and the recipient hold the keys to the conversation.</p>
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