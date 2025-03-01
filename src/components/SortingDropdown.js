import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue, SelectTrigger } from './ui/select'
import React from 'react'
import { Select } from './ui/select'

const SortingDropdown = ({setSelectedAlgo}) => {

  function handleAlgChange(val) {

    // do some shit
    setSelectedAlgo(val);

  }

  return (
    <div className='sorting-algorithm-selection flex flex-col w-full'>

      <Select  onValueChange={(val) => handleAlgChange(val)}>
        <SelectTrigger className="my-5">
          <SelectValue placeholder="Select an algorithm..." />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Algorithms</SelectLabel>
            <SelectItem value='selection'>Selection Sort</SelectItem>
            <SelectItem value='bubble'>Bubble Sort</SelectItem>
            <SelectItem value='insertion'>Insertion Sort</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      
    </div>
  )
}

export default SortingDropdown
