export default function DashboardPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4">
        {/* Monthly Burn Rate */}
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Monthly Burn Rate</p>
          <p className="text-3xl font-bold">$0</p>
          <p className="text-xs text-muted-foreground">No subscriptions yet</p>
        </div>

        {/* IOU Balance */}
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">IOU Balance</p>
          <p className="text-3xl font-bold">$0</p>
          <p className="text-xs text-muted-foreground">All settled up</p>
        </div>

        {/* Active Subscriptions */}
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Active Subscriptions</p>
          <p className="text-3xl font-bold">0</p>
          <p className="text-xs text-muted-foreground">Add your first subscription</p>
        </div>
      </div>
    </div>
  )
}
