import Link from 'next/link';
import React from 'react';

const CancelPage = () => {
  return (
    <div className="flex items-center justify-center h-[70vh] bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Payment Cancelled</h1>
        <p className="text-lg mb-6">Your payment was not completed. If you have any questions, please contact our support.</p>
        <Link href={"/cart"} className="inline-block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300">Go to Cart</Link>
      </div>
    </div>
  );
};

export default CancelPage;
