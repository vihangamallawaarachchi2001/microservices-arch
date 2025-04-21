"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, Plus, Edit, Trash2, Check, X, AlertCircle } from "lucide-react"

// Sample payment methods data
const initialPaymentMethods = [
  {
    id: 1,
    type: "visa",
    cardNumber: "•••• •••• •••• 4242",
    expiryMonth: "04",
    expiryYear: "2025",
    cardholderName: "John Doe",
    isDefault: true,
  },
  {
    id: 2,
    type: "mastercard",
    cardNumber: "•••• •••• •••• 5678",
    expiryMonth: "09",
    expiryYear: "2024",
    cardholderName: "John Doe",
    isDefault: false,
  },
]

// Card type logos
const cardLogos : any= {
  visa: "/placeholder.svg?height=30&width=50",
  mastercard: "/placeholder.svg?height=30&width=50",
  amex: "/placeholder.svg?height=30&width=50",
  discover: "/placeholder.svg?height=30&width=50",
}

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [editingPaymentId, setEditingPaymentId] = useState<number | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)

  const emptyPaymentMethod = {
    id: 0,
    type: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cardholderName: "",
    cvv: "",
    isDefault: false,
  }

  const [formData, setFormData] = useState(emptyPaymentMethod)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .slice(0, 19)

      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
        // Auto-detect card type based on first digit
        type: detectCardType(value.replace(/\s/g, "")),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const detectCardType = (cardNumber: string) => {
    const firstDigit = cardNumber.charAt(0)
    const firstTwoDigits = cardNumber.substring(0, 2)

    if (firstDigit === "4") return "visa"
    if (firstTwoDigits >= "51" && firstTwoDigits <= "55") return "mastercard"
    if (firstDigit === "3" && (cardNumber.charAt(1) === "4" || cardNumber.charAt(1) === "7")) return "amex"
    if (firstDigit === "6") return "discover"

    return ""
  }

  const handleDefaultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isDefault: e.target.checked,
    }))
  }

  const handleAddPayment = () => {
    setFormData(emptyPaymentMethod)
    setFormErrors({})
    setShowPaymentForm(true)
    setEditingPaymentId(null)
  }

  const handleEditPayment = (payment: (typeof initialPaymentMethods)[0]) => {
    // In a real app, you would fetch the full payment details
    // For demo purposes, we'll just use what we have
    setFormData({
      ...payment,
      cardNumber: "", // For security, don't pre-fill card number
      cvv: "", // For security, don't pre-fill CVV
    })
    setFormErrors({})
    setShowPaymentForm(true)
    setEditingPaymentId(payment.id)
  }

  const handleDeletePayment = (paymentId: number) => {
    setShowDeleteConfirm(paymentId)
  }

  const confirmDeletePayment = () => {
    if (!showDeleteConfirm) return

    // Don't allow deleting the default payment method
    const paymentToDelete = paymentMethods.find((p) => p.id === showDeleteConfirm)
    if (paymentToDelete?.isDefault) {
      alert("Cannot delete default payment method. Please set another payment method as default first.")
      setShowDeleteConfirm(null)
      return
    }

    setPaymentMethods((prev) => prev.filter((p) => p.id !== showDeleteConfirm))
    setShowDeleteConfirm(null)
    alert("Payment method deleted successfully")
  }

  const handleSetDefault = (paymentId: number) => {
    setPaymentMethods((prev) =>
      prev.map((payment) => ({
        ...payment,
        isDefault: payment.id === paymentId,
      })),
    )
    alert("Default payment method updated successfully")
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.cardNumber.trim()) {
      errors.cardNumber = "Card number is required"
    } else if (formData.cardNumber.replace(/\s/g, "").length < 15) {
      errors.cardNumber = "Please enter a valid card number"
    }

    if (!formData.expiryMonth) {
      errors.expiryMonth = "Expiry month is required"
    }

    if (!formData.expiryYear) {
      errors.expiryYear = "Expiry year is required"
    }

    if (!formData.cardholderName.trim()) {
      errors.cardholderName = "Cardholder name is required"
    }

    if (!formData.cvv?.trim()) {
      errors.cvv = "CVV is required"
    } else if (formData.cvv.length < 3) {
      errors.cvv = "CVV must be at least 3 digits"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSavePayment = () => {
    if (!validateForm()) return

    if (editingPaymentId) {
      // Update existing payment method
      setPaymentMethods((prev) => {
        // If this is set as default, update other payment methods
        if (formData.isDefault) {
          return prev.map((payment) =>
            payment.id === editingPaymentId
              ? {
                  ...payment,
                  expiryMonth: formData.expiryMonth,
                  expiryYear: formData.expiryYear,
                  cardholderName: formData.cardholderName,
                  isDefault: true,
                }
              : { ...payment, isDefault: false },
          )
        }

        return prev.map((payment) =>
          payment.id === editingPaymentId
            ? {
                ...payment,
                expiryMonth: formData.expiryMonth,
                expiryYear: formData.expiryYear,
                cardholderName: formData.cardholderName,
                isDefault: formData.isDefault,
              }
            : payment,
        )
      })

      alert("Payment method updated successfully")
    } else {
      // Add new payment method
      const newPayment = {
        ...formData,
        id: Date.now(), // Generate a unique ID
        cardNumber: "•••• •••• •••• " + formData.cardNumber.slice(-4), // Mask the card number
      }

      setPaymentMethods((prev) => {
        // If this is set as default or it's the first payment method, update other payment methods
        if (newPayment.isDefault || prev.length === 0) {
          return [...prev.map((p) => ({ ...p, isDefault: false })), { ...newPayment, isDefault: true }]
        }
        return [...prev, newPayment]
      })

      alert("Payment method added successfully")
    }

    setShowPaymentForm(false)
    setEditingPaymentId(null)
    setFormData(emptyPaymentMethod)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold dark:text-primary-500">Payment Methods</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your payment options</p>
        </div>
        <button
          onClick={handleAddPayment}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Card
        </button>
      </div>

      {paymentMethods.length > 0 ? (
        <div className="space-y-4">
          {paymentMethods.map((payment) => (
            <div
              key={payment.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-16 relative">
                        <Image
                          src={cardLogos[payment.type] || "/placeholder.svg?height=30&width=50"}
                          alt={payment.type}
                          width={50}
                          height={30}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium dark:text-white">{payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}</h3>
                        {payment.isDefault && (
                          <span className="px-2 py-0.5 text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm mt-1 dark:text-white">{payment.cardNumber}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Expires {payment.expiryMonth}/{payment.expiryYear}
                      </p>
                      <p className="text-sm mt-1 dark:text-white">{payment.cardholderName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:self-start">
                    <button
                      onClick={() => handleEditPayment(payment)}
                      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeletePayment(payment.id)}
                      className="p-2 rounded-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      disabled={payment.isDefault}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {!payment.isDefault && (
                      <button
                        onClick={() => handleSetDefault(payment.id)}
                        className="px-3 dark:text-white py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-medium mb-2 dark:text-white">No payment methods saved yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Add your first payment method to make checkout faster.
            </p>
            <button
              onClick={handleAddPayment}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Card
            </button>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
            <div>
              <h3 className="font-medium dark:text-white">Payment Security</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                We use industry-standard encryption and security measures to protect your payment information. Your full
                card details are never stored on our servers and are securely processed by our payment provider.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Payment Method Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingPaymentId ? "Edit Payment Method" : "Add New Payment Method"}
                </h2>
                <button
                  onClick={() => setShowPaymentForm(false)}
                  className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Card Number*
                  </label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${formErrors.cardNumber ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white`}
                    disabled={editingPaymentId !== null}
                  />
                  {formErrors.cardNumber && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{formErrors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Expiry Month*
                    </label>
                    <select
                      id="expiryMonth"
                      name="expiryMonth"
                      value={formData.expiryMonth}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.expiryMonth ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white`}
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, "0")
                        return (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        )
                      })}
                    </select>
                    {formErrors.expiryMonth && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">{formErrors.expiryMonth}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Expiry Year*
                    </label>
                    <select
                      id="expiryYear"
                      name="expiryYear"
                      value={formData.expiryYear}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.expiryYear ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white`}
                    >
                      <option value="">YY</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = (new Date().getFullYear() + i).toString()
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        )
                      })}
                    </select>
                    {formErrors.expiryYear && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">{formErrors.expiryYear}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      CVV*
                    </label>
                    <input
                      id="cvv"
                      name="cvv"
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.cvv ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white`}
                      maxLength={4}
                    />
                    {formErrors.cvv && <p className="text-sm text-red-600 dark:text-red-400 mt-1">{formErrors.cvv}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="cardholderName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Cardholder Name*
                  </label>
                  <input
                    id="cardholderName"
                    name="cardholderName"
                    type="text"
                    placeholder="Name as it appears on card"
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${formErrors.cardholderName ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {formErrors.cardholderName && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{formErrors.cardholderName}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={handleDefaultChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 dark:bg-gray-700"
                  />
                  <label htmlFor="isDefault" className="text-sm text-gray-700 dark:text-gray-300">
                    Set as default payment method
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 flex justify-end gap-2">
              <button
                onClick={() => setShowPaymentForm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePayment}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center"
              >
                <Check className="w-4 h-4 mr-2" />
                {editingPaymentId ? "Save Changes" : "Add Payment Method"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Delete Payment Method</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Are you sure you want to delete this payment method? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeletePayment}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
