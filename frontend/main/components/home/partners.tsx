import Link from "next/link";

export default function Partners() {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-900 dark:to-dark-800">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium dark:bg-primary-900/50 dark:text-primary-300 mb-4">Partnership</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-primary-100">Be Our Partner</h2>
          <p className="text-gray-600 dark:text-gray-300">Join the QuickBite family and grow your business with us</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Delivery Drivers */}
          <div className="card bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Delivery Drivers</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Earn competitive pay with flexible hours. Be your own boss and deliver on your schedule.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Flexible working hours",
                "Weekly payments",
                "Earn tips and bonuses",
                "Choose your delivery area"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <Link 
              href="/drivers/studio" 
              className="btn btn-primary w-full"
            >
              Join as Driver
            </Link>
          </div>
          
          {/* Restaurant Owners */}
          <div className="card bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in delay-150">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-900/50 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary-600 dark:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Restaurant Owners</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Expand your customer base and increase revenue by joining our platform.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Reach more customers",
                "Easy-to-use dashboard",
                "Marketing support",
                "Detailed analytics & insights"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-600 dark:text-secondary-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <Link 
              href="/restaurants/studio" 
              className="btn btn-secondary w-full"
            >
              Register Your Restaurant
            </Link>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Have questions about partnering with us?</p>
          <Link href="/contact" className="btn btn-outline dark:text-white">
            Contact Our Partnership Team
          </Link>
        </div>
      </div>
    </section>

    )
}