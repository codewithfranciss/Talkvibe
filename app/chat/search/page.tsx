"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa"; // Importing the check mark icon

export default function Search() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [friendIds, setFriendIds] = useState<Set<string>>(new Set());
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [requestSentStates, setRequestSentStates] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

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
        .select("sender_id, receiver_id")
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .eq("status", "accepted");

      if (error) {
        console.error("Error fetching friends:", error.message);
        return;
      }

      // Store friend IDs in a Set for fast lookup
      const friendSet = new Set<string>();
      data.forEach((friend: any) => {
        friendSet.add(friend.sender_id === userId ? friend.receiver_id : friend.sender_id);
      });

      setFriendIds(friendSet);
    };

    fetchFriends();
  }, []);

  const handleSearch = async () => {
    setResult([]); 
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user || !query.trim()) {
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .ilike("username", `%${query}%`);

    if (error) {
      console.error("Error fetching users:", error.message);
      return;
    }

    const filteredResults = data.filter((user) => user.id !== userData.user.id && !friendIds.has(user.id));

    setResult(filteredResults);
  };

  const handleKeydown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleSearch();
    }
  };

  const sendFriendRequest = async (receiverId: string) => {
    setLoadingStates((prev) => ({ ...prev, [receiverId]: true }));
    setRequestSentStates((prev) => ({ ...prev, [receiverId]: false }));

    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      router.push("/");
      return;
    }

    const { error } = await supabase.from("friend_requests").insert({
      sender_id: userData.user.id,
      receiver_id: receiverId,
      status: "pending",
    });

    if (error) {
      console.error("Error sending friend request:", error.message);
      setLoadingStates((prev) => ({ ...prev, [receiverId]: false }));
    } else {
      setRequestSentStates((prev) => ({ ...prev, [receiverId]: true }));
    }

    setLoadingStates((prev) => ({ ...prev, [receiverId]: false }));
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      {/* Search Bar */}
      <div className="relative mb-8">
        <Image
          src="/image/search.png"
          alt="search-icon"
          width={20}
          height={20}
          className="absolute top-1/2 left-3 -translate-y-1/2"
          priority
        />
        <input
          type="text"
          placeholder="Search for a friend"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeydown}
          className="pl-10 px-4 py-2 rounded-full border bg-[#0a0a0a] border-gray-600 w-96 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 text-white"
        />
      </div>

      {result.length > 0 ? (
        result.map((user) => (
          <div key={user.id} className="flex flex-col mb-4 gap-4 w-full max-w-2xl">
            <div className="flex items-center justify-between border border-gray-600 p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={user.avatar_url || "/image/user.png"}
                    alt="User Profile"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-text">{user.username}</h3>
                </div>
              </div>
              {/* Send Request Button */}
              <button
                onClick={() => sendFriendRequest(user.id)}
                className="rounded-full bg-secondary border-primary px-4 py-2 hover:bg-accent transition relative"
                disabled={loadingStates[user.id] || requestSentStates[user.id]}
              >
                {loadingStates[user.id] ? (
                  <span className="loading loading-primary absolute inset-0 m-auto"></span>
                ) : requestSentStates[user.id] ? (
                  <FaCheck className="text-green-500 w-5 h-5" />
                ) : (
                  <Image src="/image/add-user.png" alt="add user icon" width={20} height={10} />
                )}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="mt-44 text-center text-text">No user found</p>
      )}
    </div>
  );
}
