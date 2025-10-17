"use client"
import * as React from "react"
import { useRouter, useSearchParams } from 'next/navigation';

export function NavBar() {
  return (
    <div className="bg-white shadow-md w-full px-4 flex h-15 items-center justify-between">
    
        <h1 className="text-2xl text-center text-black p-0">
            To Do List
        </h1>
      
    </div>
  )
}

