import React from 'react'

const IndivSortingBar = ({value}) => {

    const height_unit = 50;
    const width_unit = 50;

  return (
    <div 
        className={`bg-light_blue`}
        style={
            {
                width : `${width_unit}px`,
                height : `${height_unit * value}px`
            }
        }
    >
       
    </div>
  )
}

export default IndivSortingBar
