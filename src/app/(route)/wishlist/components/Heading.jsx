import React from 'react'

const Heading = () => {
  return (
  <div className="total">
  <div className="w-[100%]  h-[35vh] text-center flex flex-col items-center justify-center">
    <h1 className="text-[2.3rem]  font-semibold">
      Your Wishlist  
    </h1>
    <br />
    <button
      className="py-2 px-28 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500"
    >
      Go Back To Home
    </button>
    <div className="cartshowing flex flex-col items-center px-8 py-4 justify-center gap-4">

    </div>
  </div>
</div>
  )
}

export default Heading

