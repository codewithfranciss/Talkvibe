import { div } from "framer-motion/client";

export default function ChatSkeleton() {
  return (
    <section className="flex flex-col h-full">
      {/* Chat Navbar Skeleton */}
      <div className="p-4 flex items-center gap-4 border-b border-gray-600 animate-pulse">
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        <div className="h-4 w-32 bg-gray-600 rounded"></div>
      </div>

      {/* Messages Skeleton */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex gap-4 items-center animate-pulse">
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div className="flex flex-col space-y-2">
              <div className="h-4 w-40 bg-gray-600 rounded"></div>
              <div className="h-3 w-32 bg-gray-500 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field Skeleton */}
      <div className="p-4 animate-pulse">
        <div className="flex items-center gap-2 border border-gray-600 rounded-full p-2">
          <div className="h-8 w-full bg-gray-600 rounded"></div>
          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
