// src/app/api/download-cv/route.ts (Optional - for analytics and better control)

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Path to your CV file in the public directory
    const filePath = path.join(process.cwd(), 'public', 'cv', 'your-cv.pdf');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'CV file not found' },
        { status: 404 }
      );
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Optional: Log download for analytics
    console.log(`CV downloaded at ${new Date().toISOString()}`);
    
    // You can add analytics here, like saving to database
    // await logDownload(request);

    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Your-Name-CV.pdf"',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error downloading CV:', error);
    return NextResponse.json(
      { error: 'Failed to download CV' },
      { status: 500 }
    );
  }
}

// Optional: Function to log downloads for analytics
async function logDownload(request: NextRequest) {
  // You can implement analytics here
  // For example, save to database, send to analytics service, etc.
  
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const ip = request.headers.get('x-forwarded-for') || 'Unknown';
  
  // Example: Save to your database or analytics service
  console.log('Download logged:', {
    timestamp: new Date().toISOString(),
    userAgent,
    ip: ip.split(',')[0], // Get first IP if there are multiple
  });
}