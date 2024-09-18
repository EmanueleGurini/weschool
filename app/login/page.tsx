import Link from "next/link";
import { login } from "./actions";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center p-6 bg-color10">
        <div className="max-w-md w-full bg-white p-8 rounded-lg space-y-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center">
            <Image
              width={250}
              height={250}
              src={"/img/WeSchool/logo_scuro.svg"}
              alt={"logo"}
            />
          </div>

          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-color100">
            Log in to your account
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
                className="mt-1  block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1"
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
                className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 "
              />
            </div>
            <div className="pt-3 pb-4">
              <Link
                href="/retrievePasswordEmail"
                className="text-sm font-bold text-color100 underline"
              >
                Forgot your password?
              </Link>
            </div>
            <div>
              <button
                formAction={login}
                type="submit"
                className="w-full bg-color100 text-color0 py-2 rounded-md hover:bg-color80 focus:outline-none focus:ring-1 focus:ring-offset-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
