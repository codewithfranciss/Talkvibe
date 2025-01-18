import Navbar from "@/component /navbar";

export default function AuthLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>      
            <div className="navbar  bg-base-100">
        <a className="btn pl-8 pt-2 font-[1400] text-primary text-2xl btn-ghost">TalkVibe</a>
</div>
   
        {children}
      </section>
    )
  }