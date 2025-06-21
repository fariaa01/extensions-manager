"use client"

import { useState, useEffect } from "react"
import { extensions as dataOriginal } from "@/data/extensions"
import ExtensionCard from "@/components/ExtensionCard"
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


function SortableItem({ extension, onToggle, onRemove, onFavorite }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: extension.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="h-full">
      <ExtensionCard
        {...extension}
        onToggle={() => onToggle(extension.id)}
        onRemove={() => onRemove(extension.id)}
        onFavorite={() => onFavorite(extension.id)}
      />
    </div>
  )
}


export default function ExtensionGrid() {
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
        <div className="flex flex-wrap gap-2">
          {["all", "active", "inactive", "favorites"].map(f => (
            <button
              key={f}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                filter === f ? "bg-red-500 text-white" : "bg-[#1e293b] text-gray-300"
              }`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="text-sm text-red-400 underline hover:text-red-300"
        >
          Reverter alterações
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
            <AnimatePresence>
              {filtered.map(ext => (
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
