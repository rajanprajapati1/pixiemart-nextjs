"use client"
import { usePathname } from 'next/navigation';

const TopBar = () => {
  const pathname = usePathname()
  const excludedPaths  = ['/login', '/signup'];; // Add more paths as needed
  const isTopbarVisible = excludedPaths .includes(pathname);
  if (isTopbarVisible) {
    return false;
  }
  return (
    <div className='w-full h-[35px] bg-red-200 flex items-center justify-center'>
         <p className="font-semibold text-sm">Special Offer: Get <span className='text-red-500'>20%</span> off on all products! Use code: <span className='text-red-500'>SAVE20</span> </p>
    </div>
  )
}

export default TopBar
