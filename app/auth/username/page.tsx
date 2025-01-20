import Image from "next/image"
import { FaUser } from "react-icons/fa"
export default function Username(){
    return(
      <>
                        <div className="navbar  bg-base-100">
        <a className="btn pl-8 pt-2 font-[1400] text-primary text-2xl btn-ghost">TalkVibe</a>
</div>
        <div className="flex flex-col items-center justify-center mt-44">
        
        <label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input type="text" className="grow" placeholder="Enter a unique Username: " />
</label>

<button className=" mt-6 hover:bg-slate-300 flex py-1 items-center gap-4 rounded flex-row-reverse px-8 bg-primary text-md text-black ">
              <div className="text-text">
                    Create an account
              </div>
              <Image 
              src='/image/profile.png'
              alt="profile icon "
              width={30}
              height={10}
              className="rounded-full"
              />
  
</button>
        </div>
        </>
    )
}