import Image from "next/image"
import { FaUser } from "react-icons/fa"
export default function Username(){
    return(
      <>
                  <div className="navbar  bg-base-100">
        <a className="btn pl-8 pt-2 font-[1400] text-primary text-2xl btn-ghost">TalkVibe</a>
</div>
<div className="flex flex-col items-center text-text mt-40 justify-center ">
           <h2 className="font-bold text-text text-5xl">Welcome to Talvibes<span className="text-primary">.com</span></h2>
           <button className=" mt-10 hover:bg-slate-300 py-2 flex items-center gap-4 rounded-full flex-row-reverse px-10 bg-primary text-md text-text ">
              <div className="font-meduim">
                    Continue with google 
              </div>
              <Image 
              src='/image/google-icon.png'
              alt="google icon "
              width={20}
              height={10}
              className="rounded-full"
              />
  
</button>
         </div>
        </>
    )
}