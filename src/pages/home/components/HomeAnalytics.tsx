'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

const people = [
  { id: 1, name: 'Year - 2024' },
  { id: 2, name: 'Year - 2023' },
  { id: 3, name: 'Year - 2022' },
  { id: 4, name: 'Year - 2021' },
  { id: 5, name: 'Year - 2020' },
]

const graphData = [
    { id: 1, expenses: 801, month: 'Jan' },
    { id: 2, expenses: 1001, month: 'Feb' },
    { id: 3, expenses: 801, month: 'Mar' },
    { id: 4, expenses: 2001, month: 'Apr' },
    { id: 5, expenses: 101, month: 'May' },
    { id: 6, expenses: 2001, month: 'Jun' },
    { id: 7, expenses: 2001, month: 'Jul' },
    { id: 8, expenses: 1001, month: 'Aug' },
    { id: 9, expenses: 2000, month: 'Sep' },
    { id: 10, expenses: 2001, month: 'Oct' },
    { id: 11, expenses: 200, month: 'Nov' },
    { id: 12, expenses: 1000, month: 'Dec' },

]

export default function HomeAnalytics() {
    const [selected, setSelected] = useState(people[1])
    const maxExpense = Math.max(...graphData.map(item => item.expenses))
    const normalizedData = graphData.map(item => ({ ...item, normalizedExpense: (item.expenses/maxExpense)}))

    return (
        <div>
            <div className="flex items-center justify-between h-20">
                <div className='text-md'>Analytics</div>
                <div className="">
                <Listbox value={selected} onChange={setSelected}>
                <ListboxButton
                    className={clsx(
                    'relative flex items-center rounded-xl border pr-1 pl-3 text-md text-gray',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                >
                    {selected.name}
                    <ChevronDownIcon
                    className="group pointer-events-none size-6 fill-black/60"
                    aria-hidden="true"
                    />
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                    'w-[var(--button-width)] rounded-xl border border-black/5 bg-gray-100 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                >
                    {people.map((person) => (
                    <ListboxOption
                        key={person.name}
                        value={person}
                        className="group flex justify-center cursor-default items-center gap-2 rounded-lg py-1.5 px-1 select-none data-[focus]:bg-white/10"
                    >
                        {/* <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" /> */}
                        <div className="text-sm/6 text-black">{person.name}</div>
                    </ListboxOption>
                    ))}
                </ListboxOptions>
                </Listbox>
            </div>
            </div>
            
            {/* Graph */}
            <div className='w-full mt-3'>
                <div className='w-full flex gap-4 overflow-scroll'>
                    {/* Graph line */}
                    {normalizedData.map((item) => (
                        <div  key={item.id} className='h-52  min-w-11 max-w-11 flex items-center justify-end flex-col'>
                            <div>₹{item.expenses}</div>
                            <div className=' bg-blue-400 w-full rounded-tl-md rounded-tr-md' style={{flex: item.normalizedExpense}}></div>
                            <div className='text-gray-400'>{item.month}</div>
                        </div>
                ))}
                </div>
            </div>
            
        </div>
    )
}