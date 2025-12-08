"use client";



import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { useSession  , signOut } from "next-auth/react";
import { User } from "next-auth";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession(); //this just give the only true or false wheter user have session or not for session data we ned to ask from the user from the next auth. 
    const user = session?.user as User | undefined;


  return (
    <nav className="bg-white border-b shadow-sm px-4 py-2 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 select-none">
        <span className="inline-block ml-15">
          <svg width="140" height="44" viewBox="0 0 140 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="32" fontFamily="Inter, Arial, sans-serif" fontWeight="bold" fontSize="28">
              <tspan fill="black">anon</tspan><tspan fill="#E11D48">msg</tspan>
            </text>
          </svg>
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-4 mr-16">
        {!session ? (
          <>
            <Link href="/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </>
        ) : (
            <> 
            {
                 session ? ( <span> Welcome, {user?.name || user?.email}</span>) : (

<Button variant="destructive" onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
                 )
            
            }
           
            
            </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md border-b md:hidden flex flex-col items-center py-4 gap-2 animate-in fade-in">
          {!session ? (
            <>
              <Link href="/sign-in" className="w-full px-4">
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link href="/sign-up" className="w-full px-4">
                <Button className="w-full">Sign Up</Button>
              </Link>
            </>
          ) : (
            <Button variant="destructive" className="w-full" onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
          )}
        </div>
      )}
    </nav>
  );
}
