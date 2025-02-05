import React from 'react'
import IndivSortingBar from './IndivSortingBar'

const SortingBars = ({values_array, positions}) => {
  return (
    <div className='sorting-bar-section-of-screen w-[80%] h-full border border-black'>
      <div className='bars-row relative h-full border border-black'>
          {
              values_array.map((value_obj, idx) => {
                return (<IndivSortingBar key={idx} value={value_obj.value} position={positions[idx]} />)
              })
          }
        
      </div>
    </div>
  )
}

export default SortingBars
