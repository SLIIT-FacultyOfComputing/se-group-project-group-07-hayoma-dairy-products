// This file replaces the deprecated middleware.ts in Next.js 16+
// Learn more: https://nextjs.org/docs/messages/middleware-to-proxy

import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // Example: You can add your proxy logic here
  // For now, this simply passes the request through unchanged
  return NextResponse.next();
}

// Optionally, you can add config if you need to match specific routes
// export const config = {
//   matcher: ['/api/:path*'],
// };
