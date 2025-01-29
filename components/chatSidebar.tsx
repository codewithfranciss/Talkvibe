"use client";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ChatSidebar() {
  const router = useRouter();
  const [friends, setFriends] = useState<any>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        router.push("/");
        return;
      }
      const userId = userData.user.id;

      const { data, error } = await supabase
        .from("friend_requests")
        .select(`
          id,
          sender_id,
          receiver_id,
          sender:users!friend_requests_sender_id_fkey (id, username, avatar_url),
          receiver:users!friend_requests_receiver_id_fkey (id, username, avatar_url)
        `)
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .eq("status", "accepted");

      if (error) {
        console.error("Error fetching friends:", error.message);
        return;
      }

      // Extract unique friends
      const uniqueFriends = Array.from(
        new Map(
          data.map((record: any) => {
            const friend = record.sender_id === userId ? record.receiver : record.sender;
            return [friend.id, friend]; // Map ensures uniqueness by ID
          })
        ).values()
      );

      setFriends(uniqueFriends);
    };

    fetchFriends();
  }, []);

  return (
    <div className="w-[380px] h-screen fixed top-0 z-40 border-r border-gray-600">
      <div className="h-full py-4">
        <h3 className="text-xl px-3 mb-4 pt-4 text-left font-bold text-foreground">
          Message
        </h3>
        <div className="relative mx-3">
          <Image
            src="/image/search.png"
            alt="search-icon"
            width={20}
            height={20}
            className="absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search for friend"
            className="pl-10 px-2 py-2 rounded-full border bg-[#0a0a0a] border-1 border-gray-600 w-full focus:outline-none"
          />
        </div>
        {/* Friend section */}
        {friends.length > 0 ? (
          friends.map((friend: any) => (
            <Link key={friend.id} href={`/chat/${friend.id}`} className="block">
              <div className="my-8 p-3 hover:bg-gray-900 w-full">
                <div className="flex gap-4">
                  <div>
                    <Image
                      src={friend.avatar_url || "/image/user.png"}
                      alt={`Profile picture of ${friend.username}`}
                      width={48}
                      height={48}
                      className="object-cover w-12 h-12 rounded-full overflow-hidden"
                    />
                  </div>
                  <div>
                    <h2 className="text-text font-bold text-base">{friend.username}</h2>
                    <p className="text-gray-600 text-sm">Last message</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 px-3">No friends found</p>
        )}
      </div>
    </div>
  );
}
