import { Toaster } from '@/components/ui/sonner'
import { SortingProvider } from '@/context/SortingContext'
import React from 'react'
import SortingPage from './SortingPage'

const page = () => {
  return (
    <SortingProvider>
      <SortingPage />
      <Toaster richColors />
    </SortingProvider>
  )
}

export default page
