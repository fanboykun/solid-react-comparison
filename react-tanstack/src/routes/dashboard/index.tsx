import {
  Profiler,
  useState,
  //  useMemo,
  //  memo,
} from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { Person } from '@/data/people'
import { SortOptions, sortPeople } from '@/components/sort-table'
import { people } from '@/data/people'
import { Counter } from '@/components/counter'
import { PersonTable } from '@/components/person-table'

export const Route = createFileRoute('/dashboard/')({
  component: App,
})

function BigTablePage() {
  const [sortField, setSortField] = useState<keyof Person>('id')
  const sortedPeople = sortPeople(people, sortField)

  const [count, setCount] = useState(0)

  return (
    <div className="border-2 border-red-500 rounded-xl p-4 space-y-6">
      <Counter count={count} setCount={setCount}>
        Table Level Counter
      </Counter>

      <SortOptions sortField={sortField} setSortField={setSortField} />

      <PersonTable people={sortedPeople} />
    </div>
  )
}

// const MemoizedBigTablePage = memo(BigTablePage);

function App() {
  const onRenderCallback = (
    _id: string,
    _phase: 'mount' | 'update' | 'nested-update',
    actualDuration: number,
  ) => {
    console.log(`actualDuration: ${actualDuration.toFixed(2)}ms`)
  }

  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto pt-8 flex flex-col gap-4">
        <Counter count={count} setCount={setCount}>
          Page Level Counter
        </Counter>
        <Profiler id="BigTablePage" onRender={onRenderCallback}>
          <BigTablePage />
        </Profiler>
      </div>
    </div>
  )
}
