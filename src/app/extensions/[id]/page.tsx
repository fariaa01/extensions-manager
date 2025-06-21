"use client"

import { useState } from "react"
import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle"
import GiscusComments from "@/components/GiscusComments"
import { extensions } from "@/data/extensions"
import giscusConfig from "@/lib/giscus.config"

export default function ExtensionDetails({ params }: { params: { id: string } }) {
  const extension = extensions.find(e => e.id === Number(params.id))

  if (!extension) {
    return <div className="p-6 text-white">Extension not found</div>
  }

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
          <Link href="/" className="text-red-400 underline">
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
            className="flex-grow p-2 rounded-md bg-[#1e293b] placeholder:text-gray-400 outline-none"
          />
          <button type="submit" className="px-4 py-2 bg-red-500 rounded-md">
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