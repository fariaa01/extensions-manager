"use client"

import { AnimatePresence } from "framer-motion"
import PageTransition from "@/components/PageTransition"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition>
        {children}
      </PageTransition>
    </AnimatePresence>
  )
}