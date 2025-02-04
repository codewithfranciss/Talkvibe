import { motion } from "framer-motion";

export default function ChatSkeleton() {
  return (
    <section className="flex flex-col h-screen overflow-hidden">
      {/* Chat Navbar Skeleton */}
      <div className="flex items-center p-4 border-b border-gray-700">
        <div className="w-10 h-10 bg-gray-600 rounded-full animate-pulse"></div>
        <div className="ml-4 w-24 h-6 bg-gray-600 rounded animate-pulse"></div>
      </div>

      {/* Chat Messages Skeleton */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.05 }}
            className={`chat ${index % 2 === 0 ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 h-10 bg-gray-600 rounded-full animate-pulse"></div>
            </div>
            <div className="chat-header">
              <div className="w-16 h-4 bg-gray-600 rounded animate-pulse"></div>
              <div className="w-12 h-3 bg-gray-600 rounded ml-2 animate-pulse"></div>
            </div>
            <div className="w-48 h-12 bg-gray-600 rounded-lg animate-pulse"></div>
          </motion.div>
        ))}
      </div>

      {/* Input Field Skeleton */}
      <div className="p-4">
        <div className="flex items-center gap-2 border border-gray-600 rounded-full p-2">
          <div className="flex-1 bg-gray-600 rounded-full h-8 animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}