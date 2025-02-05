import React from 'react'

const IndivSortingBar = ({value, position}) => {

    const height_unit = 40;
    const width_unit = 40;


  return (
    <div 
        className={`bg-light_blue absolute bottom-24 border-4 border-background`}
        style={
            {
                width : `${width_unit}px`,
                height : `${height_unit * value}px`,
                left : `${position * (width_unit)}`,
                transform : `translateX(${(position) * width_unit}px)`,
                transition : `transform 0.5s ease-in-out`,

            }
        }
    >
       
    </div>
  )
}

export default IndivSortingBar
