"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Check, X, MapPin } from "lucide-react";
import { getUserProfile, updateProfile } from "@/api";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Local storage key for storing the default address
  const DEFAULT_ADDRESS_KEY = "defaultAddress";

  // Get the default address ID from local storage
  const getDefaultAddressId = () => {
    const storedDefaultAddress = localStorage.getItem(DEFAULT_ADDRESS_KEY);
    return storedDefaultAddress ? JSON.parse(storedDefaultAddress) : null;
  };

  // Set the default address ID in local storage
  const setDefaultAddressId = (addressId: string | null) => {
    if (addressId) {
      localStorage.setItem(DEFAULT_ADDRESS_KEY, JSON.stringify(addressId));
    } else {
      localStorage.removeItem(DEFAULT_ADDRESS_KEY);
    }
  };

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const profileData = await getUserProfile();
      setAddresses(profileData.address || []);
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Handle adding a new address
  const handleAddAddress = async () => {
    if (!newAddress.trim()) {
      alert("Address cannot be empty.");
      return;
    }

    setIsLoading(true);
    try {
      const updatedAddresses = [...addresses, newAddress.trim()];
      const updatedProfile = { address: updatedAddresses };
      await updateProfile(updatedProfile);

      setAddresses(updatedAddresses);
      setNewAddress("");
      setShowAddressForm(false);
      alert("Address added successfully!");
    } catch (error) {
      console.error("Failed to add address:", error);
      alert("Failed to add address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting an address
  const handleDeleteAddress = async (addressToDelete: string) => {
    setIsLoading(true);
    try {
      const updatedAddresses = addresses.filter((addr) => addr !== addressToDelete);
      const updatedProfile = { address: updatedAddresses };
      await updateProfile(updatedProfile);

      setAddresses(updatedAddresses);
      alert("Address deleted successfully!");
    } catch (error) {
      console.error("Failed to delete address:", error);
      alert("Failed to delete address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle marking an address as default
  const handleSetDefault = (address: string) => {
    setDefaultAddressId(address);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold dark:text-primary-600">Saved Addresses</h2>
        <button
          onClick={() => {
            setShowAddressForm(!showAddressForm);
            setNewAddress("");
          }}
          className="bg-purple-500 text-white px-2 py-1 rounded-full hover:bg-purple-600 transition-colors"
        >
          + Add New Address
        </button>
      </div>

      {/* Address Form */}
      {showAddressForm && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Add New Address</h2>
            <button
              onClick={() => setShowAddressForm(false)}
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="newAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <textarea
                id="newAddress"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Enter your address here..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              onClick={handleAddAddress}
              disabled={isLoading}
              className="px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Check className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Address"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Address List */}
      {addresses.length > 0 ? (
        <div className="space-y-4">
          {addresses.map((address, index) => {
            const isDefault = address === getDefaultAddressId();
            return (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg flex items-start gap-4"
              >
                <div>
                  <p className="text-gray-600 dark:text-gray-400">{address}</p>
                  {isDefault && (
                    <span className="ml-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
                      Default Address
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 md:self-start">
                  <button
                    onClick={() => handleDeleteAddress(address)}
                    className="p-2 rounded-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {!isDefault && (
                    <button
                      onClick={() => handleSetDefault(address)}
                      className="px-3 py-1 text-sm border dark:text-white border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                    >
                      Mark as Default
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">No addresses saved yet</h3>
          <p className="text-muted-foreground mb-4">Add your first address to make ordering food easier.</p>
        </div>
      )}
    </div>
  );
}