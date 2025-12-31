import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-muted px-4 text-center font-sans transition-colors">
      
      {/* Custom SVG Animation Container */}
      <div className="relative mb-8 h-64 w-64 md:h-80 md:w-80">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full animate-in fade-in zoom-in duration-700"
        >
          {/* Ghost Body */}
          <path
            d="M100 20C60 20 30 50 30 90V160C30 170 40 180 50 170L65 155L80 170L100 150L120 170L135 155L150 170C160 180 170 170 170 160V90C170 50 140 20 100 20Z"
            fill="#E11D48" // Red-600
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />
          
          {/* Eyes */}
          <circle cx="70" cy="80" r="10" fill="white" />
          <circle cx="130" cy="80" r="10" fill="white" />
          
          {/* Confused Mouth */}
          <path
            d="M85 110C85 110 95 100 100 110C105 120 115 110 115 110"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Floating Elements (404) */}
          <text
            x="160"
            y="50"
            fontSize="40"
            fontWeight="bold"
            fill="#18181B" // Zinc-900
            className="animate-bounce"
            style={{ animationDelay: '0.2s' }}
          >
            ?
          </text>
          <text
            x="20"
            y="60"
            fontSize="30"
            fontWeight="bold"
            fill="#18181B"
            className="animate-bounce"
            style={{ animationDelay: '0.5s' }}
          >
            404
          </text>
        </svg>
        
        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 h-4 w-32 -translate-x-1/2 rounded-[100%] bg-black/10 blur-md" />
      </div>

      <h1 className="mb-2 text-4xl font-black tracking-tighter text-text-primary md:text-6xl">
        Page Not Found
      </h1>
      
      <p className="mb-8 max-w-md text-lg text-text-muted">
        Oops! The page you are looking for has vanished into the void or never existed.
      </p>

      <div className="flex gap-4">
        <Link href="/">
          <Button size="lg" className="bg-brand font-bold text-brand-foreground hover:bg-brand-hover">
            Return Home
          </Button>
        </Link>
        <Link href="/u/suggest-anon-channel">
          <Button variant="outline" size="lg" className="border-border font-bold text-text-secondary hover:bg-surface-muted">
            Browse Users
          </Button>
        </Link>
      </div>
    </div>
  );
}