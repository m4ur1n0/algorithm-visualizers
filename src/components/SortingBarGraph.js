"use client"

import { useSortingContext } from '@/context/SortingContext'
import React, { useEffect, useRef, useState } from 'react'
import SortingBars from './SortingBars'

const SortingBarGraph = () => {

    // THIS COMPONENT DEFINES THE ACTUAL WINDOW DISPLAYING THE SORTING COMPONENTS

    const {algoState, delay, isFirstRenderRef, firstRenderComplete} = useSortingContext();

    const algoRunningShadowColorHigh = `inset 0 0 40px rgba(147, 196, 253, 0.8)`;
    const algoRunningShadowColorLow = `inset 0 0 20px rgba(147, 196, 253, 0.8)`;

    const algoAtUnsortedShadowColor = `inset 0 0 40px rgba(235, 80, 80, 0.6)`;

    const algoSortedShadowColorHigh = `inset 0 0 60px rgba(36, 189, 54, 0.7)`;
    const algoSortedShadowColorLow = `inset 0 0 30px rgba(42, 219, 63, 0.7)`;


    const atRestShadowColor = `inset 0 0 10px rgba(0, 0, 0, 0.2)`;

    const [shadowState, setShadowState] = useState(atRestShadowColor);




    useEffect(() => {
      // if (isFirstRenderRef.current) {
      //   firstRenderComplete();
      //   return;
      // }

      async function doneAnimation() {
        setShadowState(algoSortedShadowColorHigh);
        await delay(600);
        setShadowState(algoSortedShadowColorLow);
        await delay(1000);
        setShadowState(atRestShadowColor);
      }

      if (algoState === 2) { // currently running

        const interval = setInterval(() => {
          setShadowState((prevShadow) =>
              (prevShadow === algoRunningShadowColorHigh || prevShadow === atRestShadowColor)
                  ? algoRunningShadowColorLow
                  : algoRunningShadowColorHigh
          );
        }, 600);


        return () => clearInterval(interval);

      } else if (algoState === 1) { // at messy
        setShadowState(algoAtUnsortedShadowColor);
      } else if (algoState === 0) { // just got cleaned up
        doneAnimation();
      }

      console.log(algoState);
    }, [algoState])


  return (
    <div 
      className='sorting-bar-graph-container flex w-[75%] h-full border border-gray-200 rounded-md'
      style={{
          boxShadow : shadowState,
          transition : 'box-shadow 0.6s ease-out'


      }}
    >
        {/* <div className='sorting-bar-graph w-full h-full'> */}
            {/* need some sort of measurements or something here */}
        <SortingBars />
        
        {/* </div> */}
    </div>
  )
}

export default SortingBarGraph
