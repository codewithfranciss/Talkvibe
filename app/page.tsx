'use client';

import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";



export default function Username() {
  const router = useRouter();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/chat", // Explicitly define the redirect URL
      },
    });

    if (error) {
      console.error("Error signing in:", error.message);
      return;
    }
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <a className="btn pl-8 pt-2 font-[1400] text-primary text-2xl btn-ghost">
          TalkVibe
        </a>
      </div>
      <div className="flex flex-col items-center text-text mt-40 justify-center">
        <h2 className="font-bold text-text text-5xl">
          Welcome to Talvibes<span className="text-primary">.com</span>
        </h2>
        <button
          onClick={handleSignIn}
          className="mt-10 hover:bg-slate-300 py-2 flex items-center gap-4 rounded-full flex-row-reverse px-10 bg-primary text-md text-text"
        >
          <div className="font-medium">Continue with Google</div>
          <Image
            src="/image/google-icon.png"
            alt="google icon"
            width={20}
            height={10}
            className="rounded-full"
          />
        </button>
      </div>
    </>
  );
}
