/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {  
  Menu, 
  X, 
  LogOut,
  GraduationCap,
  CircleUser,
  ChartBarStacked,
  BookmarkCheck,
  Users,
  Pin,
  UserStar,
  Star,
  MonitorCog,
  SquarePen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserSession } from "@/Utils/clientSideSession";
import CustomLoader from "@/components/CustomLoading";
import Link from "next/link";
import Image from "next/image";

interface DashboardLayoutProps {
  admin: React.ReactNode;
  student: React.ReactNode;
  teacher: React.ReactNode;
  role: "admin" | "student" | "teacher";
}


const adminRoutes = [
    {title: "Profile" , path: "/dashboard" , icon: <CircleUser size={20}/>},
    {title: "Categories", path: "/dashboard/categories" , icon: <ChartBarStacked size={20}/>},
    {title: "Manage Bookings" , path: "/dashboard/manage-bookings", icon: <BookmarkCheck size={20}/>},
    {title: "Manage Users", path: "/dashboard/manage-users", icon: <Users size={20}/>},
]

const teacherRoutes = [
    {title: "Profile" , path: "/dashboard" , icon: <CircleUser size={20}/>},
    {title: "Create Session", path: "/dashboard/create-sessions" , icon: <SquarePen size={20}/>},
    {title: "Manage Sessions" , path: "/dashboard/my-sessions", icon: <MonitorCog size={20}/>},
    {title: "Ratings & Reviews", path: "/dashboard/ratings", icon: <Star size={20}/>},
]

const studentRoutes = [
    {title: "Profile" , path: "/dashboard" , icon: <CircleUser size={20}/>},
    {title: "My Bookings", path: "/dashboard/my-bookings" , icon: <Pin size={20}/> },
    {title: "My Reviews" , path: "/dashboard/reviews", icon:<UserStar size={20}/>},
]

const DashboardLayout = ({ admin, student, teacher, role }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {user , isPending} = UserSession();
   
    if(isPending){
        return(
            <CustomLoader/>
        )
    }
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 transition-all duration-300 ease-in-out lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="size-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <GraduationCap size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight leading-none">Tutora</span>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1">{role}</span>
            </div>
          </div>

          {/* Sidebar Feature Buttons Dynamic */}
          <nav className="flex-1 space-y-1">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[2px] px-4 mb-4">Overview</p>
            
            {
                user?.role === "ADMIN" ?
                adminRoutes.map((admRoute, idx)=> <div key={idx}>
                    <Link href={admRoute.path} key={idx} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-white/5 hover:text-white transition-all">
                       {admRoute.icon}
                  {admRoute.title}
                      </Link>
                </div> )
                :
                user?.role === "TEACHER" ? teacherRoutes.map((techRoute, idx)=> <div key={idx} >
                      <Link href={techRoute.path} key={idx} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-white/5 hover:text-white transition-all">
                       {techRoute.icon}
                  {techRoute.title}
                      </Link>
                </div>)
                :
                studentRoutes.map((stdRoute, idx)=> <div key={idx}>
                    <Link href={stdRoute.path} key={idx} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-white/5 hover:text-white transition-all">
              {stdRoute.icon}
              {stdRoute.title}
            </Link>
                </div>) 
            }
          </nav>

          {/* Footer Sidebar Actions */}
          <div className="pt-6 border-t border-slate-800 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all">
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* --- CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 bg-white/50 backdrop-blur-xl border-b border-slate-200">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl lg:hidden transition-all"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Search Bar Design */}
          </div>

          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-slate-200 border border-slate-300">
              {/* <Image src={String(user.image)} alt="image" priority quality={100} width={100} height={100}></Image> */}
            </div>
          </div>
        </header>

       
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
             {/* Content Slots */}
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               {user?.role === "STUDENT" && student}
               {user?.role === "TEACHER" && teacher}
               {user?.role === "ADMIN" && admin}
             </div>
          </div>
        </div>
      </main>

    
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;