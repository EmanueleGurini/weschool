import Link from 'next/link';

export default function ErrorPage() {
  return (
    <>
    <section className="relative z-10 bg-[#f7f7f7] py-[120px] flex justify-center items-center">
    <div className="px-12 p-16 bg-white rounded-lg shadow-md">
    <div className="w-[600px] h-[400px] mx-auto bg-color100 border border-gray-200 rounded-lg shadow-md p-6">
      <div className="container mx-auto">
        <div className="-mx-4 flex">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[500px] text-center">
              <h2 className="mb-6 text-[80px] font-bold leading-none text-contrast sm:text-[80px] md:text-[100px]">
                Ooops!
              </h2>
              <h4 className="mb-4 text-2xl font-bold leading-9 tracking-tight text-color0">
                Maybe you got the credentials wrong
              </h4>
              <img 
              src="/img/sad.png" 
              alt="Sad face" 
              className="mx-auto mb-4 w-16 h-16" 
              />
              <p className="mb-8 pt-4 pb-1 text-l font-medium text-color0">
                Or you don't have access
              </p>
              <Link href="/" className='w-full bg-contrast text-color100 font-bold py-3 px-6 rounded-md hover:bg-contrasthover focus:outline-none focus:ring-2 focus:ring-offset-2'>
                Go to Login Page
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
  

    </>
  );
}
