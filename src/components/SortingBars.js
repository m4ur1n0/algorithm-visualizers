import React from 'react'
import IndivSortingBar from './IndivSortingBar'

const SortingBars = ({values_array}) => {
  return (
    <div className='bars-row flex flex-row items-enda gap-1'>
        {
            values_array.map((value_obj, idx) => {
               return (<IndivSortingBar key={idx} value={value_obj.value} />)
            })
        }
      
    </div>
  )
}

export default SortingBars
