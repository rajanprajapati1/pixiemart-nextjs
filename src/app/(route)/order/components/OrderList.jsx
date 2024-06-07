import React from 'react'
import OrderCard from './OrderCard'

const OrderList = ({order}) => {
  return (
    <div className='w-[80%] flex flex-col gap-2 pb-4 items-center m-auto   justify-center '>
        {order?.map((val,i)=>{
            return <OrderCard id={i+1} data={val} key={i}/>
        })}
    </div>
  )
}

export default OrderList
