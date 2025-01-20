import Sidebar from "@/components/sidebar"
export default function Chat({children}: {children: React.ReactNode}) {
return(
  <div className="flex">
    <div>
    <Sidebar />
    </div>
    <main className='mx-5 mt-16 sm:ml-[300px] sm:mt-3'>{children}</main>
    
  </div>
)
}