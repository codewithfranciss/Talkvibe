import Image from "next/image"


export default function ChatSidebar(){
    return(
        <div className="w-[380px] h-screen fixed top-0 z-40 border-r border-gray-600">
        <div className="h-full px-3 py-4">
          <h3 className="text-xl mb-4 pt-4 text-left font-bold text-foreground">
            Message
          </h3>
          <div className="relative">
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
        </div>
      </div>
    )
}