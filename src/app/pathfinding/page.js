"use client"

import { GridProvider } from '@/context/GridContext'
import React from 'react'
import PathfindingPage from './PathfindingPage'

const page = () => {
  return (
    <GridProvider>
        <PathfindingPage />
    </GridProvider>
  )
}

export default page
