import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-dark-900 dark:via-dark-900 dark:to-dark-800">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight dark: text-white">
              <span className="text-primary-600 dark:text-primary-400">
                Delicious Food
              </span>{" "}
              Delivered To Your Doorstep
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              Order from your favorite restaurants and get your food delivered
              in minutes. Fast, reliable, and delicious!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/restaurants" className="btn btn-primary btn-lg">
                Order Now
              </Link>
              <Link
                href="/about"
                className="btn btn-outline btn-lg dark:text-white"
              >
                Learn More
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-dark-900 overflow-hidden"
                  >
                    <div className="w-full h-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center text-xs font-medium dark:text-secondary-400">
                      {["JD", "SM", "AK", "RB"][i - 1]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  4.8/5
                </span>{" "}
                from over 2k+ reviews
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative animate-slide-up">
            <div className="relative w-full h-[400px] md:h-[500px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400/20 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-400/20 rounded-full filter blur-3xl"></div>

              <div className="relative z-10 w-full h-full">
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-white dark:bg-dark-800 shadow-soft overflow-hidden">
                
                  <div className="flex items-center justify-center w-full h-full space-x-4">
                   
                    <div className="relative w-20 h-20 md:w-24 md:h-24">
                      <div className="absolute inset-0 bg-primary-600 rounded-full opacity-20 animate-pulse"></div>
                      <div className="absolute inset-2 bg-primary-600 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-10 h-10 md:w-12 md:h-12"
                        >
                          <path d="M11.9999 3C8.41258 3 5.24327 4.95029 3.65002 7.9991C3.45867 8.37697 3.57162 8.83553 3.9055 9.0723C4.23938 9.30907 4.68222 9.22879 4.93355 8.91537C5.11003 8.69322 5.29603 8.48392 5.49097 8.28898C7.52724 6.25271 10.4727 5.25 13.5 5.25C14.3284 5.25 15 4.57843 15 3.75C15 2.92157 14.3284 2.25 13.5 2.25C12.6716 2.25 12 2.92157 12 3.75V3.75C12 4.57843 11.3284 5.25 10.5 5.25C9.67157 5.25 9 4.57843 9 3.75V3.75C9 2.92157 8.32843 2.25 7.5 2.25C6.67157 2.25 6 2.92157 6 3.75C6 4.57843 5.32843 5.25 4.5 5.25C3.67157 5.25 3 4.57843 3 3.75" />
                          <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" />
                          <path d="M12 13.5C9.49997 13.5 7.24997 14.7 5.99997 16.5C5.39997 17.4 6.09997 18.5 7.19997 18.5H16.8C17.9 18.5 18.6 17.4 18 16.5C16.75 14.7 14.5 13.5 12 13.5Z" />
                        </svg>
                      </div>
                    </div>
                    
                    <span className="text-4xl md:text-5xl font-bold text-primary-600">
                      QuickBite
                    </span>
                  </div>
                </div>
                <div className="absolute top-10 right-10 glass-card p-3 rounded-xl shadow-lg animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Your order is
                      </p>
                      <p className="font-medium text-sm dark:text-primary-600">On the way!</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-10 left-10 glass-card p-3 rounded-xl shadow-lg animate-fade-in delay-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-secondary-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Special discount
                      </p>
                      <p className="font-medium text-sm dark:text-primary-600">25% OFF</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
