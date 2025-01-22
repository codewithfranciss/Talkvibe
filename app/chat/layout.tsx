import Sidebar from "@/components/sidebar";
import ChatSidebar from "@/components/chatSidebar";
import Image from "next/image";

export default function Chat({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow sm:ml-[200px]">
        {/* Fixed Sidebar */}
       <ChatSidebar />

        {/* Children (Main Content Area) */}
        <div className="ml-[380px] p-4">{children}</div>
      </main>
    </div>
  );
}
