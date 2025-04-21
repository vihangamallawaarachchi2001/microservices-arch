export default function Feature() {
    return (
        <section className="py-20 px-4 bg-white dark:bg-dark-900">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Why Choose QuickBite?</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We're not just another food delivery service. We're your partner in enjoying delicious meals without the
              hassle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Fast Delivery",
                description: "Get your food delivered in under 30 minutes or your next order is free.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Wide Selection",
                description: "Choose from thousands of restaurants and cuisines in your area.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ),
              },
              {
                title: "Live Tracking",
                description: "Track your order in real-time and know exactly when it will arrive.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <div key={index} className="feature-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mb-4 p-3 rounded-full bg-primary-100 w-fit dark:bg-primary-900/50">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 dark:text-primary-200">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}