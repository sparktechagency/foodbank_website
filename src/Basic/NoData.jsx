import React from 'react'
import empty from '../assets/header/empty.png'
export const NoData = () => {
  return (
    <div className='flex justify-center'>
        <img className='w-[100px]' src={empty} alt="" />
    </div>
  )
}
