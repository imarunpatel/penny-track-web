import React, { useEffect, useRef, useState } from 'react'
import { formateDateToYYYYMMDD } from '../../../utils/helpers/dateFormate';

interface Props {
    onSelect: (date: string) => void
}
const HorizantalDatePicker: React.FC<Props> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [currentDate, setCurrentDate] = useState<string>(formateDateToYYYYMMDD(new Date()));

    const dates = generateNextLast15Days();

    useEffect(() => {
        const currentIndex = dates.indexOf(currentDate);
        if(currentIndex !== -1 && containerRef.current) {
            const currentDateElement = containerRef.current.children[currentIndex] as HTMLElement;
            currentDateElement?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            })
        }
    }, [currentDate])

    const handleDateSelect = (date: string) => {
        setCurrentDate(date);
        props.onSelect(date);
    }

  return (
    <div>
        <div ref={containerRef} className='horizontal-date-picker flex py-1 pb-2 gap-2 px-1 overflow-x-auto'>
          {dates.map(item => (
            <div key={item} 
                onClick={() => handleDateSelect(item)} 
                className={`h-8 min-w-12 py-2  rounded-md flex items-center justify-center font-semibold ${item === currentDate ? 'bg-violet-700 text-white' : 'bg-gray-300 text-black'} `}>
                    {new Date(item).getDate()}
            </div>))}
        </div>
    </div>
  )
}

const generateNextLast15Days = (): string[] => {
    const dates: string[] = [];
    const currentDate = new Date();

    for(let i=0; i<15; i++) {
        const previousDate = new Date(currentDate);
        previousDate.setDate(currentDate.getDate() + i - 15);
        dates.push(previousDate.toISOString().split('T')[0]);
    }

    for(let i=0; i<15; i++) {
        const previousDate = new Date(currentDate);
        previousDate.setDate(currentDate.getDate() + i);
        dates.push(previousDate.toISOString().split('T')[0]);
    }

    return dates;
}

export default HorizantalDatePicker