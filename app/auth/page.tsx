import Image from "next/image"
export default function Auth(){
    return(
        <>
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