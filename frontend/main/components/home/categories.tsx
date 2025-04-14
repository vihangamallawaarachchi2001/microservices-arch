import Link from "next/link";

export default function Categories() {
    return (
        <section className="py-20 px-4 bg-gray-50 dark:bg-dark-800">
                <div className="container mx-auto">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2 dark:text-primary-100">Popular Categories</h2>
                      <p className="text-gray-600 dark:text-gray-300">Explore our most ordered food categories</p>
                    </div>
                    <Link href="/restaurants" className="mt-4 md:mt-0 btn btn-outline dark:text-primary-300">
                      View All Categories
                    </Link>
                  </div>
        
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 dark:bg-gray-900 dark:rounded-2xl">
                    {[
                      { name: "Pizza", icon: "🍕" },
                      { name: "Burgers", icon: "🍔" },
                      { name: "Sushi", icon: "🍣" },
                      { name: "Salads", icon: "🥗" },
                      { name: "Desserts", icon: "🍰" },
                      { name: "Drinks", icon: "🍹" },
                    ].map((category, index) => (
                      <Link
                        href={`/restaurants?category=${category.name.toLowerCase()}`}
                        key={index}
                        className="card flex flex-col items-center justify-center p-6 hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in "
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="text-4xl mb-3">{category.icon}</div>
                        <h3 className="font-medium text-center dark:text-primary-100">{category.name}</h3>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
    )
}