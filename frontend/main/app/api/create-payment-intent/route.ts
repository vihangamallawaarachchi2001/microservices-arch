import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: any) {
  try {
    const { amount, currency } = await request.json();

    // Proxy the request to your Express backend
    const response = await axios.post('http://localhost:5000/create-payment-intent', {
      amount,
      currency,
    });

    return Response.json(response.data);
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    return Response.json({ error: 'Failed to create PaymentIntent' }, { status: 500 });
  }
}