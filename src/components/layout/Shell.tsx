import { Sidebar } from "@/components/layout/Sidebar"
import { Topbar } from "@/components/layout/Topbar"

type ShellProps= {
  children?: React.ReactNode
  title?: string
}

export function Shell({ children, title }: ShellProps) {
  return (
    <div className="flex min-h-screen bg-[--background] text-[--foreground] font-sans antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={title} />
        <main className="p-6 flex-1 overflow-y-auto max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}