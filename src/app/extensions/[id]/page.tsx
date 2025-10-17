import { extensions } from "@/data/extensions"
import ExtensionDetailsClient from "./ExtensionDetailsClient"

export default async function ExtensionDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const extension = extensions.find(e => e.id === Number(id))

  if (!extension) {
    return <div className="p-6 text-white">Extension not found</div>
  }

  return <ExtensionDetailsClient extension={extension} />
}