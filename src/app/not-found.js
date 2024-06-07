import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full flex items-center justify-center h-[80vh] bg-gray-100">
      <div className="w-[80%] max-w-lg text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/"
         className="btn bg-black text-white px-8 py-2 rounded hover:bg-gray-800 transition duration-300">
            Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
