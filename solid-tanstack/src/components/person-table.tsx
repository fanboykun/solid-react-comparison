import { For } from 'solid-js'
import type { Person } from '~/data/people'

export const PersonTable = (props: { people: Array<Person> }) => {
  return (
    <div class="max-h-[300px] overflow-y-auto">
      <div class="w-full overflow-hidden rounded-xl border border-slate-700 shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-linear-to-r from-slate-800 to-slate-700 sticky top-0 z-10">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider border-b border-slate-600">
                  ID
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider border-b border-slate-600">
                  First Name
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider border-b border-slate-600">
                  Last Name
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider border-b border-slate-600">
                  Email
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider border-b border-slate-600">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody class="bg-slate-900/50 backdrop-blur-sm divide-y divide-slate-700">
              <For each={props.people}>
                {(person, index) => (
                  <tr
                    class={`hover:bg-cyan-900/20 transition-colors ${
                      index() % 2 === 0 ? 'bg-slate-800/30' : 'bg-slate-800/10'
                    }`}
                  >
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-300">
                      {person.id}
                    </td>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-white font-medium">
                      {person.firstName}
                    </td>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-white font-medium">
                      {person.lastName}
                    </td>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-400">
                      {person.email}
                    </td>
                    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-400">
                      {person.phone}
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
