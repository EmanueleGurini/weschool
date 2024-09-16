import Link from 'next/link';

export default function ErrorPage() {
  return (
    <>
      <section className="relative z-10 bg-contrasthover py-[120px] min-h-dvh flex justify-center items-center">
        <div className="container mx-auto">
          <div className="-mx-4 flex">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[400px] text-center">
                <h2 className="mb-2 text-[50px] font-bold leading-none text-contrast sm:text-[80px] md:text-[100px]">
                  Ooops!
                </h2>
                <h4 className="text-center text-2xl font-bold leading-9 tracking-tight text-color0">
                  Maybe you got the credentials wrong!
                </h4>
                <p className="mb-8 pt-4 pb-1 text-l font-medium text-color0">
                  Or you don't have access!
                </p>
                <Link href="/" className='w-full bg-contrast text-color100 font-bold py-3 px-6 rounded-md hover:bg-contrasthover focus:outline-none focus:ring-2 focus:ring-offset-2'>
                    Go to Login Page
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t from-color80 to-primary"></div>
          <div className="flex h-full w-1/3">
            <div className="h-full w-1/2 bg-gradient-to-b from-primary to-color100"></div>
            <div className="h-full w-1/2 bg-gradient-to-t from-primary to-color100"></div>
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b from-color80 to-primary"></div>
        </div>
      </section>
    </>
  );
}
