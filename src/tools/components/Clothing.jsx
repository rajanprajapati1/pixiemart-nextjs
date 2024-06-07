import Link from 'next/link'
import React from 'react'

const Heading = () => {
  return (
<div className="total">
          <div className="w-[100%]  h-[35vh] text-center flex flex-col items-center justify-center">
            <h1 className="text-[2.3rem]  font-semibold">
              Your Orders.
            </h1>
            <br />
            <Link
              href={"/"}
              className="py-2 px-28 text-sm bg-red-600 text-white rounded-md hover:bg-red-500"
            >
              Go Back to Home
            </Link>
            <hr className='h-1 w-[80%] mt-7 rounded-md  bg-zinc-400' />
          </div>
        </div>
  )
}

export default Heading
