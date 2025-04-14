"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Package, Search, ArrowLeft, ChevronRight, Star } from "lucide-react"

// Sample order data
const orders = [
  {
    id: "ORD-7829",
    date: "Apr 15, 2023",
    time: "2:30 PM",
    restaurant: "Burger Palace",
    items: [
      { name: "Double Cheeseburger", price: 12.99, quantity: 2, options: ["No pickles", "Extra cheese"] },
      { name: "French Fries", price: 4.99, quantity: 1, options: ["Large"] },
      { name: "Soda", price: 2.99, quantity: 1, options: ["Coca-Cola"] },
    ],
    subtotal: 33.96,
    deliveryFee: 3.99,
    serviceFee: 1.99,
    tip: 5.0,
    total: 44.94,
    status: "Delivered",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    paymentMethod: "Visa •••• 4242",
    deliveryPerson: "Michael S.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "ORD-7814",
    date: "Apr 14, 2023",
    time: "7:15 PM",
    restaurant: "Pizza Heaven",
    items: [
      { name: "Pepperoni Pizza", price: 18.99, quantity: 1, options: ["Medium", "Thin crust"] },
      { name: "Garlic Bread", price: 4.99, quantity: 1, options: [] },
    ],
    subtotal: 23.98,
    deliveryFee: 3.99,
    serviceFee: 1.99,
    tip: 4.0,
    total: 33.96,
    status: "Delivered",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    paymentMethod: "Visa •••• 4242",
    deliveryPerson: "Sarah L.",
    rating: 4,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "ORD-7802",
    date: "Apr 12, 2023",
    time: "8:45 PM",
    restaurant: "Sushi Master",
    items: [
      { name: "California Roll", price: 12.99, quantity: 2, options: [] },
      { name: "Miso Soup", price: 3.99, quantity: 1, options: [] },
      { name: "Green Tea", price: 2.99, quantity: 1, options: [] },
    ],
    subtotal: 32.96,
    deliveryFee: 4.99,
    serviceFee: 1.99,
    tip: 6.0,
    total: 45.94,
    status: "Delivered",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    paymentMethod: "Mastercard •••• 5678",
    deliveryPerson: "David K.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Filter orders based on search query and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

    // Date filtering logic would go here in a real app
    const matchesDate = true

    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div className="space-y-6">
      {selectedOrder ? (
        <OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)} />
      ) : (
        <OrdersList
          orders={filteredOrders}
          onOrderSelect={setSelectedOrder}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      )}
    </div>
  )
}

function OrdersList({
  orders,
  onOrderSelect,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold flex items-center">
              <Package className="w-5 h-5 text-purple-600 mr-2" />
              Your Orders
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">View and manage your order history</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Status</option>
              <option value="delivered">Delivered</option>
              <option value="in progress">In Progress</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Time</option>
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-3-months">Last 3 Months</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders by ID, restaurant, or items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order: any) => (
              <div
                key={order.id}
                onClick={() => onOrderSelect(order)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={order.image || "/placeholder.svg"}
                      alt={order.restaurant}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{order.restaurant}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <span>{order.id}</span>
                          <span>•</span>
                          <span>
                            {order.date}, {order.time}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            order.status === "Delivered" ? "bg-green-500" : "bg-blue-500"
                          }`}
                        ></div>
                        <span className="text-sm font-medium">{order.status}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm truncate text-gray-600 dark:text-gray-300">
                        {order.items.map((item: any) => `${item.quantity}x ${item.name}`).join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                    <span className="font-medium">${order.total.toFixed(2)}</span>
                    <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {searchQuery
                  ? "No orders match your search criteria. Try a different search term."
                  : "You haven't placed any orders yet. Start ordering delicious food!"}
              </p>
              <Link
                href="/restaurants"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
              >
                Browse Restaurants
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function OrderDetails({ order, onBack }: any) {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center px-3 py-1 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{order.restaurant}</h2>
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {order.id} • {order.date}, {order.time}
              </p>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors">
                Get Help
              </button>
              <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors">
                Reorder
              </button>
            </div>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "details"
                    ? "border-purple-500 text-purple-600 dark:text-purple-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Order Details
              </button>
              <button
                onClick={() => setActiveTab("status")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "status"
                    ? "border-purple-500 text-purple-600 dark:text-purple-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Status
              </button>
              <button
                onClick={() => setActiveTab("receipt")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "receipt"
                    ? "border-purple-500 text-purple-600 dark:text-purple-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Receipt
              </button>
            </nav>
          </div>

          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Items</h3>
                <div className="space-y-4">
                  {order.items.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="flex justify-between items-start py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.quantity}x</span>
                          <span>{item.name}</span>
                        </div>
                        {item.options.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {item.options.map((option: any, idx: any) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                              >
                                {option}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Delivery Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-purple-600 dark:text-purple-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Delivery Address</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{order.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-purple-600 dark:text-purple-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
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
                      </div>
                      <div>
                        <h4 className="font-medium">Delivery Time</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {order.date}, {order.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-purple-600 dark:text-purple-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Payment Method</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{order.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
                      <span>${order.deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Service Fee</span>
                      <span>${order.serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Tip</span>
                      <span>${order.tip.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Rate Your Experience</h3>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`p-2 rounded-full ${
                        star <= order.rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
                      }`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
                <div className="pt-2">
                  <textarea
                    placeholder="Share your feedback about this order (optional)"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                    rows={3}
                  />
                  <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "status" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Order Timeline</h3>
                <div className="relative">
                  <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="space-y-8">
                    {[
                      { status: "Order Placed", time: "2:15 PM", date: order.date, completed: true },
                      { status: "Order Confirmed", time: "2:17 PM", date: order.date, completed: true },
                      { status: "Preparing Food", time: "2:20 PM", date: order.date, completed: true },
                      { status: "Out for Delivery", time: "2:45 PM", date: order.date, completed: true },
                      { status: "Delivered", time: "3:10 PM", date: order.date, completed: true },
                    ].map((step, index) => (
                      <div key={index} className="relative pl-10">
                        <div
                          className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center ${
                            step.completed ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          {step.completed && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{step.status}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {step.date}, {step.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "receipt" && (
            <div className="space-y-6">
              <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-xl font-bold">{order.restaurant}</h3>
                <p className="text-gray-500 dark:text-gray-400">Receipt #{order.id}</p>
                <p className="text-gray-500 dark:text-gray-400">
                  {order.date}, {order.time}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Items</h3>
                <div className="space-y-2">
                  {order.items.map((item: any, index: any) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        {item.options.length > 0 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.options.join(", ")}</p>
                        )}
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
                  <span>${order.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Service Fee</span>
                  <span>${order.serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Tip</span>
                  <span>${order.tip.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Download Receipt
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
