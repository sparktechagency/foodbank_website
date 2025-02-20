import React from 'react'

export const ServerError = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='text-center'>
        <h1 className='text-7xl text-red-500 font-bold'>500</h1>
        <p className='text-2xl py-2'>Internal Server Error</p>
        <p>We Apologize for the inconvenience. Please try again later.</p>
        </div>
    </div>
  )
}
