import ChatNavbar from "@/components/chatNavbar";
import Image from "next/image";
export default function ActiveChat() {
  // Mock Chat Data
  const chatMessages = [
    { id: 1, user: "Obi-Wan Kenobi", time: "12:45", message: "You were the Chosen One!", type: "start" },
    { id: 2, user: "Anakin", time: "12:46", message: "I hate you!", type: "end" },
    { id: 3, user: "Obi-Wan Kenobi", time: "12:47", message: "It was said that you would destroy the Sith, not join them!", type: "start" },
    { id: 4, user: "Anakin", time: "12:48", message: "Liar!", type: "end" },
    { id: 5, user: "Obi-Wan Kenobi", time: "12:49", message: "You have done that yourself!", type: "start" },
    { id: 6, user: "Anakin", time: "12:50", message: "This is the end for you, my master.", type: "end" },
    { id: 7, user: "Obi-Wan Kenobi", time: "12:51", message: "I will do what I must.", type: "start" },
    { id: 8, user: "Anakin", time: "12:52", message: "You underestimate my power.", type: "end" },
    // Add more messages to test scrolling
    ...Array.from({ length: 20 }, (_, index) => ({
      id: 9 + index,
      user: index % 2 === 0 ? "Obi-Wan Kenobi" : "Anakin",
      time: `12:${53 + index}`,
      message: `Message ${index + 1}`,
      type: index % 2 === 0 ? "start" : "end",
    })),
  ];

  return (
    <section className="flex flex-col h-screen overflow-hidden">
      {/* Chat Navbar */}
      <ChatNavbar />

      {/* Chat Section */}
      <div className="flex-1 overflow-y-auto p-4">
      <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="chat-header">
    Obi-Wan Kenobi
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble bg-gray-600">You were the Chosen One!</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="chat-header">
    Anakin
    <time className="text-xs opacity-50">12:46</time>
  </div>
  <div className="chat-bubble bg-primary">I hate you!</div>
  <div className="chat-footer opacity-50">Seen at 12:46</div>
</div>
      </div>

      {/* Input Field */}
      <div className="p-4">
        <div className="flex items-center gap-2 border border-gray-600 rounded-full p-2">
        <textarea
      placeholder="Type your message..."
      className="flex-1 bg-transparent border-non outline-none text-white px-4 placeholder:text-lg placeholder-gray-400 resize-none h-8 "
    />
          <button>
            <Image 
            src={`/image/send.png`}
            alt="send-icon"
            width={25}
            height={20}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
