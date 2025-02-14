import { useSortingContext } from '@/context/SortingContext';
import React, {useEffect} from 'react'

const IndivSortingBar = ({value, position}) => {
  
  const {positions} = useSortingContext();
  let num_bars = positions.length;
  // need to generate values that keep the entire graph within bounds (plus like 4% padding on L, R, T)
  // all measurements below should correspond to percentages
  const total_available_width = 92; // minimum 4% spacing each side
  const max_available_height = 80; // max 80% of  height
  const padding = 4;

  let height_unit = max_available_height / num_bars;
  if (height_unit < 1) height_unit = 1;  
  let width_unit = Math.floor(total_available_width / num_bars);
  // if (width_unit < 1) width_unit = 1;
  if (width_unit > 20) width_unit = 20;

  let percentage_taken_up_by_bars = width_unit * num_bars;
  let additional_padding = (total_available_width - percentage_taken_up_by_bars) / 2;
  // console.log(`bars : ${percentage_taken_up_by_bars}  -  addit padding : ${additional_padding}`);

  // console.log(width_unit);
  let total_padding = padding + additional_padding;

  let leftPercent = ((position) * (width_unit)) + total_padding;


  return (
    <div 
        className={`individual-graph-bar bg-light_blue absolute bottom-20 border-4  border-background`}
        style={
            {
              
                width : `${width_unit}%`,
                // maxWidth : '8%',
                height : `${height_unit * (value + 1)}%`, // need to account for 0 indexing!!!
                left : `${leftPercent}%`,
                transition : `left 0.5s ease-in-out`,

            }
        }
    >
      
    </div>
  )
}

export default IndivSortingBar
