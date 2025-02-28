"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import  Link  from 'next/link'
import React from 'react'

const IndexCards = ({url, title, image_path, description}) => {
    // const router = useRouter();

    // const navigate = () => {
    //     router.push(url)
    // }
    console.log(url);
  return (
    <Link href={url} legacyBehavior>
        <a>
            <Card className='w-[350px] h-[450px] transition-transform duration-500 ease-in-out hover:scale-[1.05]' >
                <CardHeader className='object-cover'>
                    <div className={`w-full bg-gray-100 shadow-inner flex flex-col justify-center items-center h-[230px] `}>
                        <img src={image_path} className={` ${image_path === '/images/gear-wrench.png' ? 'w-[75%]' : 'h-full w-full object-cover'}`} />
                    </div>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {description}
                </CardContent>

            </Card>
        </a>
    </Link>
  )
}

export default IndexCards
