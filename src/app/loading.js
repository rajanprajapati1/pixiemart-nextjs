import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className="loader w-[25px] h-[25px] border-red-300 rounded-full animate-spin border-t-2 border-r-2">
      </div>
    </div>
  )
}

export default Loading
