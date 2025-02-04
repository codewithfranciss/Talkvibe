"use client";
import { useEffect, useState } from "react";
import ChatNavbar from "@/components/chatNavbar";
import ChatSkeleton from "@/components/skeleton/chatSkeleton";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ActiveChat() {
  const { id: chatId } = useParams();
  const router = useRouter();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null); // Chat partner
  const [currentUser, setCurrentUser] = useState<any>(null); // Authenticated user

  // Fetch chat partner's details
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("username, avatar_url")
        .eq("id", chatId)
        .single();

      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }
      setUser(data);
    };

    fetchUser();
  }, [chatId]);

  // Fetch authenticated user and messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data: authUser } = await supabase.auth.getUser();
      if (!authUser?.user) {
        router.push("/");
        return;
      }

      // Fetch the authenticated user's details
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("username, avatar_url")
        .eq("id", authUser.user.id)
        .single();

      if (userError) {
        console.error("Error fetching current user:", userError.message);
        return;
      }

      setCurrentUser({ id: authUser.user.id, ...userData });

      // Fetch messages only between the two users
      const { data, error } = await supabase
        .from("message")
        .select("*")
        .or(
          `and(sender_id.eq.${authUser.user.id},receiver_id.eq.${chatId}), and(sender_id.eq.${chatId},receiver_id.eq.${authUser.user.id})`
        )
               .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error.message);
        return;
      }

      setMessages(data || []);
    };

    fetchMessages();
  }, [chatId, router]);

  // Real-time listener for new messages
  useEffect(() => {
    if (!currentUser || !chatId) 
      return 
      <ChatSkeleton/>  ;

    const subscription = supabase
      .channel("messages")
      .on("postgres_changes", { event: "*", schema: "public", table: "message" }, (payload) => {
        const newMessage = payload.new;

        console.log(payload.new)
 {
          setMessages((prev) => [...prev, newMessage]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [chatId]);

  // Send Message Function
  const sendMessage = async () => {
    if (!message.trim() || message === '') return;
    if (!currentUser) return;

    const newMessage = {
      sender_id: currentUser.id,
      receiver_id: chatId,
      message,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]); 

    const { error } = await supabase.from("message").insert([newMessage]);
    if (error) {
      console.error("Error sending message:", error.message);
    }
    setMessage("");
  };

  // Handle Enter Key for Sending Messages
  const handleKeydown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
      setMessage("");
    }
  };

  // Auto Scroll to Bottom on New Message
  useEffect(() => {
    const scrollToBottom = () => {
      const chatContainer = document.getElementById("messages-container");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    };
    scrollToBottom();
  }, [messages]);

  if (!user || !currentUser) {
    return    
  }

  return (
    <section className="flex flex-col h-screen overflow-hidden">
      {/* Chat Navbar */}
      <ChatNavbar avatar={user.avatar_url || "/image/default-avatar.png"} user={user.username} />

      {/* Chat Section */}
      <div id="messages-container" className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.created_at}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.05 }}
            className={`chat ${msg.sender_id === currentUser.id ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    msg.sender_id === currentUser.id
                      ? currentUser.avatar_url || "/image/default-avatar.png"
                      : user.avatar_url || "/image/default-avatar.png"
                  }
                  alt="User Avatar"
                />
              </div>
            </div>
            <div className="chat-header">
              {msg.sender_id === currentUser.id ? "You" : user.username}
              <time className="text-xs opacity-50 ml-2">
                {new Date(msg.created_at).toLocaleTimeString()}
              </time>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`chat-bubble ${msg.sender_id === currentUser.id ? "bg-primary" : "bg-gray-600"}`}
            >
              {msg.message}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4">
        <div className="flex items-center gap-2 border border-gray-600 rounded-full p-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeydown}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none outline-none text-white px-4 placeholder:text-lg placeholder-gray-400 resize-none h-8"
          />
          <button onClick={sendMessage}>
            <Image src={`/image/send.png`} alt="send-icon" width={25} height={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
