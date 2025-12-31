"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import Logo from "@/components/created/logo";
import { ThemeToggle } from "@/components/created/theme-toggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  return (
    <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Logo size="lg" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Main Nav Links */}
          <nav className="flex items-center gap-6">
            <Link href="/u/suggest-anon-channel" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">
              Browse
            </Link>
            <Link href="/blog" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">
              Contact
            </Link>
          </nav>

          <div className="h-6 w-px bg-border" aria-hidden="true" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {!session ? (
              <>
                <Link href="/sign-in">
                  <Button className="text-text-secondary hover:text-brand hover:bg-brand-muted border-none shadow-none" variant="ghost">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-brand hover:bg-brand-hover text-brand-foreground font-bold shadow-sm">Get Started</Button>
                </Link>
              </>
            ) : (
              <> 
                <span className="text-sm font-medium text-text-secondary hidden lg:inline-block">
                  Welcome, <span className="text-text-primary font-bold">{user?.username || user?.email}</span>
                </span>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-text-secondary hover:text-brand hover:bg-brand-muted">Dashboard</Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-border text-text-secondary hover:bg-surface-muted hover:text-brand"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-brand text-text-secondary"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-background shadow-lg border-b border-border md:hidden flex flex-col py-4 animate-in slide-in-from-top-5">
          <div className="flex flex-col px-4 gap-2 mb-4 border-b border-border-muted pb-4">
            <Link href="/u/suggest-anon-channel" className="py-2 text-sm font-medium text-text-secondary hover:text-brand" onClick={() => setMenuOpen(false)}>
              Browse Users
            </Link>
            <Link href="/blog" className="py-2 text-sm font-medium text-text-secondary hover:text-brand" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/contact" className="py-2 text-sm font-medium text-text-secondary hover:text-brand" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </div>

          <div className="flex flex-col px-4 gap-3">
            {!session ? (
              <>
                <Link href="/sign-in" className="w-full">
                  <Button variant="outline" className="w-full text-text-secondary border-border">Sign In</Button>
                </Link>
                <Link href="/sign-up" className="w-full">
                  <Button className="w-full bg-brand hover:bg-brand-hover text-brand-foreground">Get Started</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="w-full">
                  <Button variant="ghost" className="w-full text-text-secondary justify-start">Dashboard</Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full border-border text-text-secondary hover:bg-brand-muted hover:text-brand" 
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
