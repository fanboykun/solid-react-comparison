import { For } from 'solid-js'
import type { Person } from '~/data/people'

export function sortPeople(people: Array<Person>, sortField: keyof Person) {
  console.log('sorting people by', sortField)
  return [...people].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue
    }

    return String(aValue).localeCompare(String(bValue))
  })
}

export const SortOptions = (props: {
  sortField: keyof Person
  setSortField: (field: keyof Person) => void
}) => {
  const sortOptions = [
    { field: 'id' as const, label: 'ID' },
    { field: 'firstName' as const, label: 'First Name' },
    { field: 'lastName' as const, label: 'Last Name' },
    { field: 'email' as const, label: 'Email' },
    { field: 'phone' as const, label: 'Phone' },
  ]

  return (
    <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg">
      <div class="flex items-center gap-3 flex-wrap">
        <For each={sortOptions}>
          {(option) => (
            <button
              onClick={() => props.setSortField(option.field)}
              class={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                props.sortField === option.field
                  ? 'bg-linear-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          )}
        </For>
      </div>
    </div>
  )
}
