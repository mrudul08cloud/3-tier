export default function Header({ stats, onAddClick }) {
  const percent =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <header className="relative overflow-hidden rounded-3xl mb-8 p-8 bg-gradient-to-br from-violet-900/60 via-fuchsia-900/40 to-slate-900/60 border border-white/10 shadow-glow">
      {/* Decorative blobs */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Title area */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">✦</span>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-300 via-fuchsia-300 to-orange-300 bg-clip-text text-transparent">
              My Tasks
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1 pl-11">
            {stats.active} task{stats.active !== 1 ? "s" : ""} remaining ·{" "}
            {stats.completed} completed
          </p>

          {/* Progress bar */}
          <div className="mt-4 pl-11">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-400 w-10 text-right">
                {percent}%
              </span>
            </div>
          </div>
        </div>

        {/* Stats pills */}
        <div className="flex gap-3 flex-wrap">
          <StatPill label="Total" value={stats.total} color="violet" />
          <StatPill label="Done" value={stats.completed} color="emerald" />
          <StatPill label="Active" value={stats.active} color="fuchsia" />
        </div>
      </div>

      {/* Add Task button — floats bottom right */}
      <button
        id="add-task-btn"
        onClick={onAddClick}
        className="absolute bottom-6 right-6 btn-primary flex items-center gap-2 text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        Add Task
      </button>
    </header>
  );
}

function StatPill({ label, value, color }) {
  const colors = {
    violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    fuchsia: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
  };
  return (
    <div className={`flex flex-col items-center px-5 py-3 rounded-2xl border ${colors[color]}`}>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs opacity-70 mt-0.5">{label}</span>
    </div>
  );
}
