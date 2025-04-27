import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: any) {
  try {
    const orderData = await request.json();

    const response = await axios.post('http://localhost:5000/save-order', orderData);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}