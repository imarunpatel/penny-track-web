import React, { useEffect, useRef, useState } from 'react'



interface Props {
    options: {key: string; value: string}[];
    onSelect: (key: string) => void,
    placeholder: string
    required: boolean
    defaultValue: string
}
const Dropdown: React.FC<Props> = (props) => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<{key: string; value: string}>({key: '', value: ''});

    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const item = props.options.find(item => item.key === props.defaultValue);
        if(item) {
            setSelected(item);
        }
    }, [props])


    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && !inputRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        if(open) {
            document.addEventListener('mousedown', handleDocumentClick)
        } else {
            document.removeEventListener('mousedown', handleDocumentClick)
        }
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick)
        }
    }, [open])

    const handleSelectCategory = (data: {key: string, value: string}) => {
        props.onSelect(data.key);
        setSelected(data)
        setOpen(false);
    }

  return (
    <div>
        <div className="relative" ref={dropdownRef}>
              <label
                htmlFor="first_name"
                className="block text-xs font-medium text-gray-500 dark:text-white"
              >
                Category
              </label>
              <input ref={inputRef} value={selected.value} onChange={() => null} type="text" onFocus={() => setOpen(true)}
                style={{
                    borderColor: props.required ? "red" : "",
                  }}
                className="h-9 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder={props.placeholder}
                readOnly
                />
              {open && 
              <div className={`w-full bg-white rounded-md absolute z-10 border max-h-24 overflow-y-auto ${open ? '' : 'hidden'}`}>
                {props.options.map(item => 
                    (
                    <div key={item.key} onClick={() => handleSelectCategory(item)} className="items px-3 py-1 border-b hover:bg-gray-100 cursor-pointer">
                    {item.value}
                    </div>
                ))}
                 {/* <div key="d" onClick={() => handleSelectCategory({key: '', value: ''})} className="items px-3 py-1 border-b hover:bg-gray-100 cursor-pointer">
                  Uncategorised
                  </div> */}
              </div>}
        </div>
    </div>
  )
}

export default Dropdown