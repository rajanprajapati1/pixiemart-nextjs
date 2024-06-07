"use client";
import React from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";
const Footer = () => {
  const pathname = usePathname();
  const excludedPaths = ["/login", "/signup"]; // Add more paths as needed
  const isFooterVisible = excludedPaths.includes(pathname);
  if (isFooterVisible) {
    return false;
  }
  return (
    <footer className="relative flex items-center ">
      <div className="absolute top-0 left-0 w-full  bg-gradient-to-b from-gray-800 to-black z-[-1]" />

      <div className="container mx-auto max-w-6xl px-4">
        <div className="bg-slate-50 bg-opacity-80 backdrop-blur-md border border-gray-200 rounded-lg p-8 m-4">
          <div className="flex flex-wrap lg:flex-nowrap gap-8">
            <div className="w-full lg:w-1/2">
              <div className="newsletter">
                <h3 className="font-serif font-light text-center text-2xl">
                Stay informed about the latest products, exclusive deals, and exciting promotions delivered straight to your inbox.
                </h3>
                <form className="flex items-center justify-between mt-4 border-b border-black max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Email Address"
                    className="w-full py-3 text-lg font-bold bg-transparent border-none focus:outline-none placeholder-black"
                  />
                  <button className="appearance-none bg-transparent border-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="ml-2"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            <div className="w-full lg:w-1/4">
              <nav className="c-nav-tool">
                <h4 className="font-medium">Menu</h4>
                <ul className="space-y-2">
                <li>
                    <Link href="/Category" className="c-link">
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link href="/order" className="c-link">
                      Shopping History
                    </Link>
                  </li>
                  
                  <li>
                    <Link href="/about" className="c-link">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/blogs/community" className="c-link">
                      Community
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="w-full lg:w-1/4">
              <nav className="c-nav-tool">
                <h4 className="font-medium">Support</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/pages/help" className="c-link">
                      Help &amp; FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/pages/terms-conditions" className="c-link">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/pages/privacy-policy" className="c-link">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/pages/contact" className="c-link">
                      Contact us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between mt-14">
            <div className="w-full lg:w-1/2 flex space-x-4">
              <div className="logo flex items-center ">
                <div className="name flex items-center">
                  <h1 className="pixel  text-xl text-red-500">P</h1>
                  <h1 className="pixel  text-xl text-green-500">i</h1>
                  <h1 className="pixel  text-xl text-blue-500">x</h1>
                  <h1 className="pixel  text-xl text-yellow-500">i</h1>
                  <h1 className="pixel  text-xl text-purple-500">e</h1>
                  <h1 className="mart font-semibold text-xl">Mart</h1>
                </div>
              </div>
            </div>
            <div
              className="w-full lg:w-1/4 flex justify-end items-center"
              onClick={() => window.scrollTo({
                top : 0 ,
                left : 10 , 
                behavior :'smooth'
              })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1 10h3l-4-4-4 4h3v4h2v-4z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; 2022 PixieMart.in</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
