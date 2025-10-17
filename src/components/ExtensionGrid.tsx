"use client"

import { useState, useEffect } from "react"
import { extensions as dataOriginal } from "@/data/extensions"
import ExtensionCard from "@/components/ExtensionCard"
import ClientOnly from "@/components/ClientOnly"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"


type Extension = {
  id: number
  name: string
  description: string
  logo: string
  active: boolean
  favorite?: boolean
}

type SortableItemProps = {
  extension: Extension
  onToggle: (id: number) => void
  onRemove: (id: number) => void
  onFavorite: (id: number) => void
}


function SortableItem({ extension, onToggle, onRemove, onFavorite }: SortableItemProps){
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: extension.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="h-full"
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        layout: { duration: 0.4 }
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <ExtensionCard
        {...extension}
        onToggle={() => onToggle(extension.id)}
        onRemove={() => onRemove(extension.id)}
        onFavorite={() => onFavorite(extension.id)}
      />
    </motion.div>
  )
}


function ExtensionGridContent() {
  const [filter, setFilter] = useState("active")
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [items, setItems] = useState<Extension[]>(dataOriginal)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<{ type: "info" | "danger"; message: string } | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.toLowerCase())
    }, 300)
    return () => clearTimeout(timeout)
  }, [search])

  const handleToggle = (id: number) => {
    setItems(prev =>
      prev.map(ext =>
        ext.id === id ? { ...ext, active: !ext.active } : ext
      )
    )
    const toggled = items.find(ext => ext.id === id)
    if (toggled) {
      setFeedback({
        type: toggled.active ? "danger" : "info",
        message: toggled.active
          ? `${toggled.name} foi desativada.`
          : `${toggled.name} foi ativada.`,
      })
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  const handleFavorite = (id: number) => {
    setItems(prev =>
      prev.map(ext =>
        ext.id === id ? { ...ext, favorite: !ext.favorite } : ext
      )
    )
  }

  const handleRemove = (id: number) => {
    const removed = items.find(ext => ext.id === id)
    setItems(prev => prev.filter(ext => ext.id !== id))
    setSelectedId(null)
    if (removed) {
      setFeedback({
        type: "danger",
        message: `Extensão "${removed.name}" removida com sucesso.`,
      })
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  const handleReset = () => {
    setItems(dataOriginal)
    setFeedback({
      type: "info",
      message: "Alterações revertidas com sucesso.",
    })
    setTimeout(() => setFeedback(null), 3000)
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const filtered = items
    .filter(ext => {
      if (filter === "favorites") return ext.favorite
      if (filter === "all") return true
      return ext.active === (filter === "active")
    })
    .filter(ext => ext.name.toLowerCase().includes(debouncedSearch))

  return (
    <>
      <input
        type="text"
        placeholder="Search extension..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full mb-4 p-2 rounded-md bg-[#1e293b] text-white placeholder:text-gray-400 outline-none focus:ring-2 ring-red-500"
      />

      {feedback && (
        <div className="mb-4">
          <div
            className={`flex items-center gap-2 p-3 rounded-md text-sm font-medium ${
              feedback.type === "danger"
                ? "bg-red-900 text-red-300"
                : "bg-blue-900 text-blue-300"
            }`}
          >
            {feedback.message}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex flex-wrap gap-2 items-center">
          {["all", "active", "inactive", "favorites"].map(f => (
            <motion.button
              key={f}
              className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
                filter === f ? "bg-red-500 text-white" : "bg-[#1e293b] text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundColor: filter === f ? "#ef4444" : "#1e293b"
              }}
              transition={{ duration: 0.2 }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </motion.button>
          ))}
          <motion.span 
            className="text-sm text-gray-400 ml-2"
            key={filtered.length}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            ({filtered.length} items)
          </motion.span>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-md hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          revert changes
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (active.id !== over?.id) {
            const oldIndex = items.findIndex(ext => ext.id === active.id)
            const newIndex = items.findIndex(ext => ext.id === over?.id)
            const newItems = arrayMove(items, oldIndex, newIndex)
            setItems(newItems)
          }
        }}
      >
        <SortableContext items={filtered.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((ext) => (
                <SortableItem
                  key={ext.id}
                  extension={ext}
                  onToggle={handleToggle}
                  onRemove={() => setSelectedId(ext.id)}
                  onFavorite={handleFavorite}
                />
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      <Dialog open={selectedId !== null} onOpenChange={() => setSelectedId(null)}>
        <DialogContent className="bg-[#1e293b] text-white">
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja remover?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setSelectedId(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => handleRemove(selectedId!)}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function ExtensionGrid() {
  const fallback = (
    <div className="space-y-4">
      <div className="w-full h-10 bg-[#1e293b] rounded-md animate-pulse" />
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="px-4 py-1 rounded-full bg-[#1e293b] animate-pulse w-20 h-8" />
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataOriginal
          .filter(ext => ext.active)
          .slice(0, 6)
          .map(ext => (
            <div key={ext.id} className="h-48 bg-[#1e293b] rounded-xl animate-pulse" />
          ))}
      </div>
    </div>
  )

  return (
    <ClientOnly fallback={fallback}>
      <ExtensionGridContent />
    </ClientOnly>
  )
}
