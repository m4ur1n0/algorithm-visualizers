import { SortingProvider } from '@/context/SortingContext'
import React from 'react'
import SortingPage from './SortingPage'

const page = () => {
  return (
    <SortingProvider>
      <SortingPage />
    </SortingProvider>
  )
}

export default page
