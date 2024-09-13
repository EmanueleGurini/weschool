import Link from "next/link";
import { login } from "./actions";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center p-6 bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center">
            <Image
              width={100}
              height={100}
              src={"/img/logoipsum-332.svg"}
              alt={"logo"}
            />
          </div>

          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-color100">
            Sign in to your account
          </h2>

          <form className="">
            <div>
              <label
                htmlFor="email"
                className="block pt-4 pb-1 text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-1  block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block pt-4 pb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="pt-3 pb-4">
              <Link
                href="/retrievePasswordEmail"
                className="text-sm font-bold text-color100 underline"
              >
                Retrieve Password
              </Link>
            </div>
            <div>
              <button
                formAction={login}
                type="submit"
                className="w-full bg-color100 text-color0 py-2 rounded-md hover:bg-color80 focus:outline-none focus:ring-2  focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
