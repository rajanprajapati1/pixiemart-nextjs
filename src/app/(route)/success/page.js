"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const SuccessPage = () => {
  const router = useRouter();

  useEffect(()=>{
  const timer =  setTimeout(()=>{
      router.push('/order')
    },3000)
    return ()=>clearTimeout(timer)
  },[router])

  return (
    <div className="flex items-center justify-center h-[70vh] bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-500 mb-4">Payment Successful!</h1>
        <p className="text-lg mb-6">Thank you for your purchase. Your payment was successful.</p>
        <Link href={`/`}
         className="inline-block bg-green-500
          text-white px-6 py-2 rounded-lg
           hover:bg-green-600 transition duration-300">Go to Home</Link>
      </div>
    </div>
  );
};

export default SuccessPage;
