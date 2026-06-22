"use client";

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 w-full bg-blue-700 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-white font-bold text-lg">EFFETools</span>

        <div className="flex items-center gap-4">
          {session?.user?.name && (
            <span className="text-blue-200 text-sm">{session.user.name}</span>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-white text-sm bg-blue-800 px-4 py-1.5 rounded-md hover:bg-blue-900 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
