"use client";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const [FromData, SetFromData] = useState({
    email: "",
    password: "",
  });
  const isButtonDisabled =
    FromData.email.length === 0 || FromData.password.length < 2;
  const HandleProviderLogin = async (provider) => {
    setLoading(true);
    try {
      const res = await signIn(provider, { callbackUrl: "/" });
      if (res.ok) {
        toast({
          title: "Logged In Successfully !!",
          description: ".........",
        });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const HandleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn(`credentials`, {
        email: FromData.email,
        password: FromData.password,
        redirect: true,
      });
      if (res?.ok) {
        toast({
          title: "Logged In Successfully !!",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
        router.push("/");
        seterror("");
        SetFromData({
          name: "",
          email: "",
          password: "",
        });
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-300 via-yellow-100 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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
        <div className="text-center">
          <p className="text-lg text-gray-600">
            Log in to your account and discover the best deals!
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          onSubmit={HandleLogin}
          method="POST"
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
                "Log In"
              )}
            </button>
          </div>
          <div className="flex justify-between gap-2">
            <button
              onClick={() => HandleProviderLogin("github")}
              className="w-full flex justify-center py-2 px-4  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              Sign in with GitHub
            </button>
            <button
              onClick={() => HandleProviderLogin("google")}
              className=" w-full flex justify-center py-2 px-4  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign in with Google
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Don't have an account? Let's create
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
