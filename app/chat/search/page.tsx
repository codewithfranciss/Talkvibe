'use client'

import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';
import Image from 'next/image';

export default function Search() {
const [query, setQuery] = useState("")
const [result, setResult] = useState<any[]>([])
  const handleSearch = async () => {
    if (!query.trim()) return;
      const {data, error} = await supabase
      .from('users')
      .select('*')
      .ilike("username", `%${query}%`)
 
   if (error) {
        console.error("Error fetching users:", error.message);
        return;
      }else {
        console.log(data)
      setResult(data || []);
    } 
  }
  const handleKeydown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == "Enter"){
          e.preventDefault()
          await handleSearch()
        }
  }
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      {/* Search Bar */}
      <div className="relative mb-8">
        <Image
          src="/image/search.png"
          alt="search-icon"
          width={20}
          height={20}
          className="absolute top-1/2 left-3 -translate-y-1/2"
          priority
        />
        <input
          type="text"
          placeholder="Search for a friend"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeydown}
          className="pl-10 px-4 py-2 rounded-full border bg-[#0a0a0a] border-gray-600 w-96 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 text-white"
        />
      </div>

      { result.length > 0 ?(
      result.map((results) =>(
      <div 
      key={results.id}
      className="flex flex-col mb-4 gap-4 w-full max-w-2xl">
        
          <div
           
            className="flex items-center justify-between border border-gray-600  p-4 rounded-lg shadow-md"
          >
            
            <div className="flex items-center gap-4">
              <div 
              className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={`${results.avatar_url}`}
                  alt="User Profile"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-text">{results.username}</h3>
              </div>
            </div>

            {/* Send Request Button */}
            <button className="rounded-full bg-secondary border-primary px-4 py-2  hover:bg-accent transition">
              <Image
              src={`/image/add-user.png`}
              alt='add user icon'
              width={20}
              height={10}
              />
      
            </button>
        
          </div>
          </div>
        ))): (
        <p className='mt-44 text-center text-text'>No user found</p>
      )}
      
    </div>
  );
}
