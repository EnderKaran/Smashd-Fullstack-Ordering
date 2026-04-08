import { Sidebar } from "@/components/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      <Sidebar />
      <main className="flex-1 min-h-screen pt-16 lg:pt-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}