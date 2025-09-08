import React from 'react'

const Tittle = ({text1 ,text2}) => {
  return (
    <div className=' text-gray-500 text-2xl text-center'>
        <p className=' font-semibold' > <span>{text1}</span> <span className=' font-bold'> {text2}</span></p>
        <p className='  w-16 h-[2px] bg-gray-600 mx-auto mt-2'></p>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, saepe.</p>

    </div>
  )
}

export default Tittle