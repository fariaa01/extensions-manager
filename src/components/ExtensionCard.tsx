"use client"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Star } from "lucide-react"

type Props = {
  id: number
  name: string
  description: string
  logo: string
  active: boolean
  favorite: boolean
  onToggle: () => void
  onRemove: () => void
  onFavorite: () => void
}

export default function ExtensionCard({
  name,
  description,
  logo,
  active,
  favorite,
  onToggle,
  onRemove,
  onFavorite,
}: Props) {
  return (
    <div className="relative h-full bg-[#1e293b] rounded-xl p-4 flex flex-col justify-between text-white shadow-sm">
      <button
        onClick={onFavorite}
        className="absolute top-2 right-2 p-1"
        title="Favoritar"
      >
        <Star
          className={`w-5 h-5 ${
            favorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
          }`}
        />
      </button>

      <div>
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-[#cbd5e1] p-2 rounded-md">
            <Image src={logo} alt={name} width={24} height={24} />
          </div>
          <h2 className="font-semibold text-base">{name}</h2>
        </div>

        <p className="text-sm text-gray-300 mb-4">{description}</p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <Button variant="secondary" className="text-sm" onClick={onRemove}>
          Remove
        </Button>
        <Switch
          checked={active}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-red-500"
        />
      </div>
    </div>
  )
}
