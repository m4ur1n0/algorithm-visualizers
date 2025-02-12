import { useSortingContext } from '@/context/SortingContext'
import React from 'react'
import IndivSortingBar from './IndivSortingBar'

const SortingBars = () => {

  const {positions, barValues} = useSortingContext();

  return (
      <div className='bars-row relative h-full w-full'>
          {
              barValues.map((val, idx) => {
                return (<IndivSortingBar key={idx} value={val} position={positions[idx]} />)
              })
          }
        
      </div>
  )
}

export default SortingBars
