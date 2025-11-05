import type { JSX, Setter } from 'solid-js'

export const Counter = (props: {
  count: number
  setCount: Setter<number>
  children: JSX.Element
}) => {
  return (
    <div class="flex items-center gap-4 bg-linear-to-r from-cyan-900/30 to-blue-900/30 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 shadow-lg">
      <button
        onClick={() => props.setCount(props.count - 1)}
        class="w-12 h-12 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
      >
        -
      </button>
      <span class="text-4xl font-bold text-white tabular-nums">
        {props.count}
      </span>
      <button
        onClick={() => props.setCount(props.count + 1)}
        class="w-12 h-12 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
      >
        +
      </button>
      {props.children && (
        <span class="text-sm text-gray-400 uppercase tracking-wide">
          {props.children}
        </span>
      )}
    </div>
  )
}
