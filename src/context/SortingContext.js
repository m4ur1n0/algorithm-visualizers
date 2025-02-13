"use client"

import React, { createContext, useContext, useState, } from 'react';

const SortingContext = createContext();

export const SortingProvider = ({children}) => {

    const size = 30;

    // DEAL WITH POSITIONS -- THE ACTUAL RENDERERS
    const [positions, setPositions] = useState(Array.from({length : size}, (_, i) => i));

    // function pushPosition() {
    //     setPositions(prev => {
    //         let x = prev.length;
    //         return [...prev, x];
    //     })
    // }

    function setNumPositions(amount) {
        const newArr = Array.from({length : amount}, (_, i) => i); /// positions will start from 0 though values should start from one 
        setPositions(newArr);
    }

    


    // DEAL WITH BAR VALUES -- MIGHT BE USEFUL LATER
    const [barValues, setBarValues] = useState(Array.from({length : size}, (_, k) => k));


    // function pushBarValue(value) {
    //     setBarValues(prev => {
    //         return [...prev, value];
    //     })
    //     // push another position as well
    //     pushPosition();
    // }

    function setNumBars(amount) {
        const newArr = Array.from({length : amount}, (_, k) => k);
        setBarValues(newArr);
        // set number of positions as well.
        

    }


    // general -- modify both
    function setNum(amount) {
        setNumBars(amount);
        setNumPositions(amount);
    }

    const delay = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    function swapPositions(idx1, idx2) {

        return new Promise((resolve) => {
            // check indices' validity
            if (
                typeof idx1 !== 'number' || typeof idx2 !== 'number' || !Number.isInteger(idx1) || !Number.isInteger(idx2) || idx1 < 0 || idx2 < 0 || idx1 > positions.length || idx2 > positions.length
            ) {
                console.error(`Invalid indices provided to swapPositions : [ ${idx1} , ${idx2} ] for length ${positions.length}`);
                resolve(); // complete promise
                return;
            } else if (idx1 === idx2) {
                console.log("trivial call to swapPositions()");
                resolve();
                return;
            }


            setPositions((prevPositions) => {
                const newPositions = [...prevPositions];
                [newPositions[idx1], newPositions[idx2]] = [newPositions[idx2], newPositions[idx1]];
    
                // Update barValues based on the new positions
                setBarValues((prevBarValues) => {
                    const newBarValues = [...prevBarValues];
                    [newBarValues[idx1], newBarValues[idx2]] = [newBarValues[idx2], newBarValues[idx1]];
    
                    // Resolve the promise with the new positions
                    return newBarValues;
                });
                return newPositions;
            });

            resolve();

        });
    }

    // ALGORITHM STATE
    // 0 = at rest, fully sorted, 
    // 1 = at rest, unsorted, 
    // 2 = currently running
    const [algoState, setAlgoState] = useState(0);

    function setAlgoRunning() {
        setAlgoState(2);
    }

    function setAlgoSorted() {
        setAlgoState(0);
    }

    function setAlgoUnsorted() {
        setAlgoState(1);
    }


    const value = {
        delay,
        positions,
        swapPositions,
        barValues,
        setNum,
        algoState,
        setAlgoSorted,
        setAlgoUnsorted,
        setAlgoRunning,


    }

    return (
        <SortingContext.Provider value={value}>
            {children}
        </SortingContext.Provider>
    )

}

export const useSortingContext = () => useContext(SortingContext);