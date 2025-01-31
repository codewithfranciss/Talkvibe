"use client"

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link"
import Image from "next/image";
import { usePathname } from "next/navigation";
import { use } from "react";
export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path : string):boolean => {
    return pathname === path}
      const handleLogout = async () =>{
        const { error } = await supabase.auth.signOut()
          router.push('/')
      }
  return (
    <aside className="w-[200px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r border-gray-600">
      <div className="h-full px-3 py-4">
        <h3 className="mx-6 text-xl pt-4 font-bold text-foreground">TalkVibe</h3>
        <div>
          <ul className=" mt-10 mx-6">
            <div className="mb-8 flex gap-4 items-center ">
              <Image 
              src='/image/chat-bubble.png'
              alt="chat-icon"
              width={20}
              height={10}
              />
            <li>
              <Link href="/chat" className={`hover:text-gray-400 ${isActive('/chat')? "font-extrabold": ""}`}>Chat</Link>
            </li>  
            </div>

            <div className="mb-8 flex items-center gap-4">
            <Image 
              src='/image/search.png'
              alt="search-icon"
              width={20}
              height={10}
              />
            <li>
              <Link href="/chat/search" className={`hover:text-gray-400 ${isActive('/chat/search')? "font-extrabold": ""}`}>Search</Link>
            </li>
            </div>

            <div className="flex gap-4 items-center mb-8">
            <Image 
              src='/image/user.png'
              alt="friends-icon"
              width={20}
              height={10}
              />
            <li >
              <Link href="/chat/friends" className={`hover:text-gray-400 ${isActive('/chat/friends')? "font-extrabold": ""}`}>Add a friend</Link>
            </li>
            </div>

            <div className="flex gap-4 items-center mb-8">
            <Image 
              src='/image/notification.png'
              alt="friends-icon"
              width={20}
              height={10}
              />
            <li>
              <Link href="/chat/notification" className={`hover:text-gray-400 ${isActive('/chat/notification')? "font-extrabold": ""}`}>Notification</Link>
            </li>
            </div>
            <div className="flex gap-4 items-center mb-8">
            <Image 
              src='/image/profile.png'
              alt="friends-icon"
              width={20}
              height={10}
              />
                        <li>
              <Link href="/chat/profile" className={`hover:text-gray-400 ${isActive("/chat/profile")? "font-extrabold":""}`}>Profile</Link>
            </li>
            </div>
          </ul>

          <div className="mt-80 mb-4">
            <button onClick={handleLogout} className="w-full py-2 text-black bg-text hover:bg-gray-400 rounded-full">
              Logout
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
}
