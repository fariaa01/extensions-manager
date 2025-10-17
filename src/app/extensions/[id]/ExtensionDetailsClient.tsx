"use client"

import { useState } from "react"
import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle"
import GiscusComments from "@/components/GiscusComments"
import giscusConfig from "@/lib/giscus.config"

type Extension = {
  id: number
  name: string
  description: string
  logo: string
  active: boolean
  favorite?: boolean
}

interface ExtensionDetailsClientProps {
  extension: Extension
}

export default function ExtensionDetailsClient({ extension }: ExtensionDetailsClientProps) {
  const [repo, setRepo] = useState(giscusConfig.repo)
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input) {
      setRepo(input)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-black text-white">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors duration-200 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <ThemeToggle />
        </div>

        <h1 className="text-2xl font-bold mb-4">{extension.name}</h1>
        <p className="mb-8 text-gray-300">{extension.description}</p>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="owner/repo"
            className="flex-grow p-2 rounded-md bg-[#1e293b] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
          />
          <button type="submit" className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200 cursor-pointer">
            Load
          </button>
        </form>

        <GiscusComments
          repo={repo}
          repoId={giscusConfig.repoId}
          category={giscusConfig.category}
          categoryId={giscusConfig.categoryId}
        />
      </div>
    </div>
  )
}