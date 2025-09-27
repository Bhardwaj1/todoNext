"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname(); // This will change on route changes

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/me", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null); // Clear user if not authenticated
      }
    }
    fetchUser();
  }, [pathname]); 

  console.log(user);

  return user ? (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700">
        Welcome, {user.name || user.email}
      </span>
      <LogoutButton onLogout={() => setUser(null)} />
    </div>
  ) : (
    <>
      <Link href="/login">Login</Link>
      <Link href="/register" className="ml-2">
        Register
      </Link>
    </>
  );
}