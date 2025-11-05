export const Counter = ({
  count,
  setCount,
  children,
}: {
  count: number
  setCount: (count: number) => void
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-center gap-4 bg-linear-to-r from-cyan-900/30 to-blue-900/30 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 shadow-lg">
      <button
        onClick={() => setCount(count - 1)}
        className="w-12 h-12 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
      >
        -
      </button>
      <span className="text-4xl font-bold text-white tabular-nums">
        {count}
      </span>
      <button
        onClick={() => setCount(count + 1)}
        className="w-12 h-12 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
      >
        +
      </button>
      {children && (
        <span className="text-sm text-gray-400 uppercase tracking-wide">
          {children}
        </span>
      )}
    </div>
  )
}
