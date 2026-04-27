export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* sidebar will go here later */}
      <main className="flex-1">{children}</main>
    </div>
  )
}