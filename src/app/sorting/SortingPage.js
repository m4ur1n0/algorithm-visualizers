"use client"


import SortingBarGraph from '@/components/SortingBarGraph'
import SortingControls from '@/components/SortingControls';
import { useSortingContext } from '@/context/SortingContext';
import React from 'react'

const SortingPage = () => {

  const {positions, barValues, swapPositions} = useSortingContext();

    
  
  return (
    <div className='w-screen h-screen flex items-center gap-5 p-4'>
      <SortingControls />
      <SortingBarGraph />
    </div>
  )
}

export default SortingPage
