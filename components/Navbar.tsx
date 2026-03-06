"use client";

import { UserSession } from "@/Utils/clientSideSession";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import CustomLoader from "./CustomLoading";
import Image from "next/image";
import { Menu, X, LogOut, User, DoorOpen } from "lucide-react"; // Better icons
import { cn } from "@/lib/utils";
import authClient from "@/lib/auth-client";
import { Spinner } from "./ui/spinner";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [logoutLoading , setLogoutLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { user, isPending } = UserSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tutors", href: "/tutors" },
    { name: "Sessions", href: "/sessions" },
  ];

  const isActive = (path: string) => 
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  // Close dropdown/menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserLogout = async()=>{
    setLogoutLoading(true);
    await authClient.signOut();
    setLogoutLoading(false);
  }
  if (isPending) return <CustomLoader />;

 return (
    <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-100">
      <div className="max-w-full mx-auto px-12  sm:px-8 h-20 flex items-center justify-between">
        
        {/* 1. Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-sky-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:rotate-6 transition-transform">
            T
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Tutora</span>
        </Link>

        {/* 2. Desktop Navigation Links (Hidden on Mobile) */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-sky-600",
                  isActive(link.href) ? "text-sky-600" : "text-slate-600"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* 3. Action Area (Profile/Login + Mobile Toggle) */}
        <div className="flex items-center justify-center  gap-2 md:gap-6">
          
          {/* User Profile or Login - VISIBLE ON ALL SCREENS */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1 p-1 rounded-full hover:bg-slate-100 transition"
              >
                <Image
                  src={user?.image || "/default-avatar.png"}
                  width={35}
                  height={35}
                  alt="user"
                  className="rounded-full shadow w-full h-full  border-slate-200"
                />
                
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-in fade-in zoom-in-95">
                   <div className="px-3 py-2 border-b border-slate-50 mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                  </div>
                  <Link href={"/dashboard"} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
                    <User className="size-4" /> Profile
                  </Link>
                  <button onClick={()=>handleUserLogout()} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                    {logoutLoading ? <Spinner className="size-4"></Spinner> : <div className="flex justify-center items-center"><LogOut className="size-4" /> Logout</div>}
                  </button>
                  <Link href={"/dashboard"} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                    <DoorOpen className="size-4" /> Dashboard
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:block bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition"
            >
              Get Started
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* 4. Mobile Slide-down Menu */}
      <div className={cn(
        "absolute top-20 left-0 w-full bg-white border-b shadow-2xl md:hidden transition-all duration-300 origin-top overflow-hidden",
        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      )}>
        <div className="p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-semibold py-2 border-b border-slate-50",
                isActive(link.href) ? "text-sky-600" : "text-slate-600"
              )}
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center w-full h-12 rounded-xl bg-sky-600 text-white font-bold"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;