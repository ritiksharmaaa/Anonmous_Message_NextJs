'use client'
import { useSession, signIn, signOut } from "next-auth/react"
export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in O <br />
      <button onClick={() => signIn()} className="bg-white text-black p-2 m-2 rounded-sm shadow-md">Sign in</button>
    </>
  )
}