import Sidebar from "@/components/sidebar"
import Image from "next/image"
export default function Chat({children}: {children: React.ReactNode}) {
return(
  <div className="flex">
    <div>
    <Sidebar />
    </div>
    <main className=' sm:ml-[200px]'>
    <div className="w-[380px] relative h-screen fixed top-0 z-40 border-r border-gray-600">
        <div className="h-full px-3 py-4">
        <h3 className=" text-xl mb-4 pt-4 text-left font-bold text-foreground">Message</h3>
        <div className="relative ">

  <i className="fas fa-search absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
  <Image 
  src={`/image/search.png`}
  alt="search-icon"
  width={20}
  height={10}
  />
  </i>

  <input 
    type="text" 
    placeholder="Search for friend" 
    className="pl-10 px-2 py-2 rounded-full border bg-[#0a0a0a] border-1 border-gray-300 w-full focus:outline-none"
  />
</div>

        </div>
        {children}
</div>
      
      </main>
    
  </div>
)
}