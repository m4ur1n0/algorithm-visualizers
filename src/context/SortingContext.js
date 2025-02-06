"use client"

import React, { createContext, useContext, useState, } from 'react';

const SortingContext = createContext();

export const SortingProvider = ({children}) => {

    const size = 15;

    // DEAL WITH POSITIONS -- THE ACTUAL RENDERERS
    const [positions, setPositions] = useState(Array.from({length : size}, (_, i) => i));

    function pushPosition() {
        setPositions(prev => {
            let x = prev.length;
            return [...prev, x];
        })
    }

    function setNumPositions(amount) {
        const newArr = Array.from({length : amount}, (_, i) => i); /// positions will start from 0 though values should start from one 
        setPositions(newArr);
    }

    function swapPositions(idx1, idx2) {
        if (idx1 !== idx2) {
            setPositions(prev => {
                const newPositions = [...prev];
                [newPositions[idx1], newPositions[idx2]] = [newPositions[idx2], newPositions[idx1]];
                return newPositions;
            });
        }
    }


    // DEAL WITH BAR VALUES -- MIGHT BE USEFUL LATER
    const [barValues, setBarValues] = useState(Array.from({length : size}, (_, k) => ({value : k + 1})));


    function pushBarValue(value) {
        setBarValues(prev => {
            return [...prev, {value}];
        })
        // push another position as well
        pushPosition();
    }

    function setNumBars(amount) {
        const newArr = Array.from({length : amount}, (_, k) => ({value : k + 1}));
        setBarValues(newArr);
        // set number of positions as well.
        

    }

    const delay = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    const value = {
        delay,
        positions,
        setNumPositions,
        pushPosition,
        swapPositions,
        setNumBars,
        pushBarValue,
        barValues,


    }

    return (
        <SortingContext.Provider value={value}>
            {children}
        </SortingContext.Provider>
    )

}

export const useSortingContext = () => useContext(SortingContext);