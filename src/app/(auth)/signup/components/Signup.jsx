"use client";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter()
  const [Loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const [FromData, SetFromData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const isButtonDisabled =
    FromData.email.length === 0 || FromData.password.length < 2;

  const HandleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify({
          name: FromData.name,
          email: FromData.email,
          password: FromData.password,
        }),
      });
      const data = await res?.json();
      if (res?.ok || res?.status === 200) {
        toast({
          title: data?.msg,
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
        seterror("")
        SetFromData({
          name: "",
          email: "",
          password: "",
        });
        router.push("/login")
      } else if (res.status === 505) {
        seterror(data?.msg);
        toast({
          title: data?.msg,
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
        setTimeout(() => {
          seterror("")
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "error while creating user",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } finally {
      setLoading(false);

    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-red-300 via-yellow-100 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="logo flex justify-center items-center ">
          <div className="name flex items-center">
            <h1 className="pixel mr-3">Welcome</h1>
            <h1 className="pixel mr-3">to</h1>
            <h1 className="pixel  text-xl text-red-500">P</h1>
            <h1 className="pixel  text-xl text-green-500">i</h1>
            <h1 className="pixel  text-xl text-blue-500">x</h1>
            <h1 className="pixel  text-xl text-yellow-500">i</h1>
            <h1 className="pixel  text-xl text-purple-500">e</h1>
            <h1 className="mart font-semibold text-xl">Mart</h1>
          </div>
        </div>
        <div>
          <div className="text-center">
            <p className="text-lg text-gray-600">
              Sign up to discover the best deals and a wide variety of products!
            </p>
          </div>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={HandleSignup}
          action="#"
          method="POST"
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                value={FromData.name}
                onChange={(e) =>
                  SetFromData((prev) => ({ ...prev, name: e.target.value }))
                }
                name="name"
                type="text"
                autoComplete="name"
                className="appearance-none mt-3  rounded-[5px] relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                value={FromData.email}
                onChange={(e) =>
                  SetFromData((prev) => ({ ...prev, email: e.target.value }))
                }
                name="email"
                type="email"
                autoComplete="email"
                className="appearance-none mt-3  rounded-[5px] relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                value={FromData.password}
                onChange={(e) =>
                  SetFromData((prev) => ({ ...prev, password: e.target.value }))
                }
                name="password"
                type="password"
                autoComplete="current-password"
                className=" mt-3 appearance-none rounded-[5px] relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {error && (
                <small className="text-red-600 absolute text-xs mt-1 ml-1 font-semibold">
                  {error}
                </small>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/findmyaccount"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              disabled={isButtonDisabled}
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {Loading ? (
                <div className="flex items-center">
                  Authenticating... Please wait.
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Alreay Have an account? Let's Go Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
