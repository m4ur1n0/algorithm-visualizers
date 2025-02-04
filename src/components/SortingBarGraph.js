import React from 'react'
import SortingBars from './SortingBars'

const SortingBarGraph = () => {

    const dummy_bars_array = [
        {
            value : 1
        },
        {
            value : 2
        },
        {
            value : 3
        },
        {
            value : 4
        },
        {
            value : 5
        },
        {
            value : 6
        },
        {
            value : 7
        },
        {
            value : 8
        },
        {
            value : 9
        },
        {
            value : 10
        },
        {
            value : 11
        },
        {
            value : 12
        },
    ]

  return (
    <div className='sorting-bar-graph'>
        {/* need some sort of measurements or something here */}
        <SortingBars values_array={dummy_bars_array} />
      
    </div>
  )
}

export default SortingBarGraph
