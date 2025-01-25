"use client"

import Image from "next/image"
import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import {useRouter} from "next/navigation"
import Link from "next/link"
import Username from "../page"

export default function Chat(){
  const router = useRouter()
  useEffect(() => {
    const storeLoggedinUser = async() => {
      const { data: { user } } = await supabase.auth.getUser()
     
      if(!user){
          router.push('/')
      }else{
        try{
        const {data} = await supabase
        .from('users')
        .insert({
          id: user.id,
          username : user.user_metadata.name,
          avatar_url: user.user_metadata.avatar_url
        })
        }catch(e){
          console.error(e)
          router.push('/')
        }
      }
    }
    storeLoggedinUser();

  },[])
    return (
      <div className="text-lg flex flex-col items-center justify-center h-screen font-bold  text-text">
      <h2 className="text-left text-4xl my-4">Add a Firend </h2>
      <p className="text-base text-gray-400 mb-4">To have a converstion / chat with the friend</p>
      <Link href={`/chat/search`}><button className="bg-primary hover:bg-accent font-medium text-base text-text rounded-full px-6 py-2">Add friend</button></Link>
    </div>
    )
}