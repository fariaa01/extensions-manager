import Navbar from "@/components/Navbar"
import ExtensionGrid from "@/components/ExtensionGrid"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] to-black text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold mb-6">Extensions List</h1>
        <ExtensionGrid />
      </div>
    </main>
  )
}
