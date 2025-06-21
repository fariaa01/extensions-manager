"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

type Props = {
  repo: string
  repoId: string
  category: string
  categoryId: string
}

export default function GiscusComments({ repo, repoId, category, categoryId }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    while (el.firstChild) el.removeChild(el.firstChild)

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.async = true
    script.setAttribute("data-repo", repo)
    script.setAttribute("data-repo-id", repoId)
    script.setAttribute("data-category", category)
    script.setAttribute("data-category-id", categoryId)
    script.setAttribute("data-mapping", "title")
    script.setAttribute("data-strict", "0")
    script.setAttribute("data-reactions-enabled", "1")
    script.setAttribute("data-emit-metadata", "0")
    script.setAttribute("data-input-position", "bottom")
    script.setAttribute(
      "data-theme",
      theme === "dark" ? "transparent_dark" : "light"
    )
    script.setAttribute("crossorigin", "anonymous")
    el.appendChild(script)
  }, [repo, repoId, category, categoryId, theme])

  return <div ref={ref} />
}