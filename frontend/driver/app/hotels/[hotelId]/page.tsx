'use client';

import { useParams } from 'next/navigation';

export default function HotelDetailPage() {
  const { hotelId } = useParams();
  const { hotelName } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Hotel Details</h1>
      <p>Hotel ID: {hotelId}</p>
      <p>Hotel ID: {hotelName}</p>

      {/* Later you can fetch full hotel details using hotelId */}
    </div>
  );
}
