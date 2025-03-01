
// import { useRouter } from 'next/router'
import IndexCards from '@/components/IndexCards';
import React from 'react'


const index = () => {
  // const router = useRouter();

  const pathfinding_desc = "Visualize different pathfinding algorithms. Make custom mazes and obstacles, and watch how your favorite graph traversal/pathfinding algorithms solve them!";
  const pathfinding_image = "/images/algorithm-visualizer.png";

  const sorting_desc = "Visualize different sorting algorithms. See how they stack up against varying sized lists, and watch their patterns in real time.";
  const sorting_image=  "/images/sorting-visualizer.png"

  const graphs_desc="Graphs and Trees themed algorithm visualizer coming soon. Homework seems to be delaying my education..."

  const gear_image = "/images/gear-wrench.png"



  return (
    <div className='index-page w-screen h-screen flex flex-col justify-center items-center'>

      <div className='cards-container flex border p-4 gap-4 shadow-inner'>
        <IndexCards url={'/pathfinding'} title={"Pathfinding"} description={pathfinding_desc} image_path={pathfinding_image}/>
        <IndexCards url={'/sorting'} title={"Sorting"} description={sorting_desc} image_path={sorting_image} />
        <IndexCards url={'/'} title={"Graphs and Trees"} description={graphs_desc} image_path={gear_image} />

      </div>

    </div>
  )
}

export default index
