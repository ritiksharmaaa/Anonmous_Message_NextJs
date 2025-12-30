"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import Logo from "@/components/created/logo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Logo size="lg" variant="light" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Main Nav Links */}
          <nav className="flex items-center gap-6">
            <Link href="/u/suggest-anon-channel" className="text-sm font-medium text-zinc-600 hover:text-red-600 transition-colors">
              Browse
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 hover:text-red-600 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-sm font-medium text-zinc-600 hover:text-red-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="h-6 w-px bg-zinc-200" aria-hidden="true" />

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {!session ? (
              <>
                <Link href="/sign-in">
                  <Button className="text-zinc-600 hover:text-red-600 hover:bg-red-50 border-none shadow-none" variant="ghost">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-sm">Get Started</Button>
                </Link>
              </>
            ) : (
              <> 
                <span className="text-sm font-medium text-zinc-600 hidden lg:inline-block">
                  Welcome, <span className="text-zinc-900 font-bold">{user?.username || user?.email}</span>
                </span>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-zinc-600 hover:text-red-600 hover:bg-red-50">Dashboard</Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-red-600"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-zinc-600"
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-b md:hidden flex flex-col py-4 animate-in slide-in-from-top-5">
          <div className="flex flex-col px-4 gap-2 mb-4 border-b border-zinc-100 pb-4">
            <Link href="/u/suggest-anon-channel" className="py-2 text-sm font-medium text-zinc-600 hover:text-red-600" onClick={() => setMenuOpen(false)}>
              Browse Users
            </Link>
            <Link href="/blog" className="py-2 text-sm font-medium text-zinc-600 hover:text-red-600" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/contact" className="py-2 text-sm font-medium text-zinc-600 hover:text-red-600" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </div>

          <div className="flex flex-col px-4 gap-3">
            {!session ? (
              <>
                <Link href="/sign-in" className="w-full">
                  <Button variant="outline" className="w-full text-zinc-600 border-zinc-200">Sign In</Button>
                </Link>
                <Link href="/sign-up" className="w-full">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Get Started</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="w-full">
                  <Button variant="ghost" className="w-full text-zinc-600 justify-start">Dashboard</Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full border-zinc-200 text-zinc-700 hover:bg-red-50 hover:text-red-600" 
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
