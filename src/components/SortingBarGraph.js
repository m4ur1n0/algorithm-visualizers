"use client"

import { useSortingContext } from '@/context/SortingContext'
import React, { useState } from 'react'
import SortingBars from './SortingBars'

const SortingBarGraph = () => {

    // THIS COMPONENT DEFINES THE ACTUAL WINDOW DISPLAYING THE SORTING COMPONENTS

    const {positions, barValues} = useSortingContext();

  return (
    <div className='sorting-bar-graph-container flex w-[75%] h-full border border-gray-200 rounded-md shadow-inner'>
        {/* <div className='sorting-bar-graph w-full h-full'> */}
            {/* need some sort of measurements or something here */}
        <SortingBars values_array={barValues} positions={positions} />
        
        {/* </div> */}
    </div>
  )
}

export default SortingBarGraph
