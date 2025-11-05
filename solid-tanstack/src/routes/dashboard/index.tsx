import { createFileRoute } from '@tanstack/solid-router'
import { createSignal } from 'solid-js'
import type { Person } from '~/data/people'
import { Counter } from '~/components/counter'
import { PersonTable } from '~/components/person-table'
import { SortOptions, sortPeople } from '~/components/sort-table'
import { people } from '~/data/people'

export const Route = createFileRoute('/dashboard/')({
  ssr: true,
  component: App,
})

function BigTablePage() {
  const [sortField, setSortField] = createSignal<keyof Person>('id')
  const sortedPeople = () => sortPeople(people, sortField())

  const [count, setCount] = createSignal(0)

  return (
    <div class="border-2 border-red-500 rounded-xl p-4 space-y-6">
      <Counter count={count()} setCount={setCount}>
        Table Level Counter
      </Counter>

      <SortOptions sortField={sortField()} setSortField={setSortField} />

      <PersonTable people={sortedPeople()} />
    </div>
  )
}

function App() {
  //   const onRenderCallback = (
  //     _id: string,
  //     _phase: 'mount' | 'update' | 'nested-update',
  //     actualDuration: number,
  //   ) => {
  //     console.log(`actualDuration: ${actualDuration.toFixed(2)}ms`)
  //   }

  const [count, setCount] = createSignal(0)
  return (
    <div class="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div class="max-w-7xl mx-auto pt-8 flex flex-col gap-4">
        <Counter count={count()} setCount={setCount}>
          Page Level Counter
        </Counter>
        <BigTablePage />
        {/* <Profiler>
        </Profiler> */}
      </div>
    </div>
  )
}
