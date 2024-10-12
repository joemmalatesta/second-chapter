import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('Received a POST request to /api/login');
  
  // TODO: Implement actual login logic here

  return NextResponse.json({ message: 'Login endpoint reached' });
}
