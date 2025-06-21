import "./globals.css"
import { Providers } from "./providers"

export const metadata = {
  title: "Extensions Manager",
  description: "Manage your browser extensions beautifully.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-b from-[#0f172a] to-black text-white min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
