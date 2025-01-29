import { Spin } from 'antd'
import React from 'react'

export const Loading = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <Spin size="large" />
    </div>
  )
}
