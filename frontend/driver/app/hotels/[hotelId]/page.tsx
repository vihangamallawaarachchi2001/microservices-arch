'use client';

import { useParams } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface AddMenuModalProps {
  hotelId: string;
  onClose: () => void;
}

export default function HotelDetailPage() {
  const params = useParams();
  const hotelId = params.hotelId as string;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Hotel Details</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Menu
      </button>

      {isModalOpen && (
        <AddMenuModal
          hotelId={hotelId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

function AddMenuModal({ hotelId, onClose }: AddMenuModalProps) {
  const [formData, setFormData] = useState({
    categoryName: '',
    foodName: '',
    image: '',
    price: '',
    description: '',
    isAvailable: true,
    isOfferAvailable: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement; // ✅ Typecast to HTMLInputElement
    const { name, value, type, checked } = target;
  
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3003/api/hotel/foods', {
        ...formData,
        hotelID: hotelId,
      }, { withCredentials: true });

      alert('Menu item added successfully!');
      onClose(); // Close modal after success
    } catch (error) {
      console.error(error);
      alert('Failed to add menu item');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New Menu</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="categoryName"
            placeholder="Category Name"
            value={formData.categoryName}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="text"
            name="foodName"
            placeholder="Food Name"
            value={formData.foodName}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <div className="flex items-center gap-2">
            <label>Available?</label>
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Offer Available?</label>
            <input
              type="checkbox"
              name="isOfferAvailable"
              checked={formData.isOfferAvailable}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
