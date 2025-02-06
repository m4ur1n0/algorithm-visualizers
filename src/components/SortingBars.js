import React from 'react'
import IndivSortingBar from './IndivSortingBar'

const SortingBars = ({values_array, positions}) => {
  return (
      <div className='bars-row relative h-full w-full'>
          {
              values_array.map((value_obj, idx) => {
                return (<IndivSortingBar key={idx} value={value_obj.value} position={positions[idx]} />)
              })
          }
        
      </div>
  )
}

export default SortingBars
