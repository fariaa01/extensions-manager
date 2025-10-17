"use client"

import { Settings } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="bg-[#1e293b] p-4 flex justify-between items-center rounded-xl mt-4 max-w-6xl mx-auto">
      <div className="flex items-center space-x-3">
        <div className="transition-transform duration-200 hover:scale-110">
          <Image src="/images/logo-console-plus.svg" alt="Logo" width={32} height={32} />
        </div>
        <span className="text-xl font-semibold text-white">Extensions</span>
      </div>
      <button className="text-white hover:text-gray-400 cursor-pointer transition-all duration-200 hover:scale-110">
        <Settings size={20} />
      </button>
    </nav>
  )
}
