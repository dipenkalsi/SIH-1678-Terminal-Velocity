import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
// Define which routes should be public and static files
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);
const isStaticFile = createRouteMatcher([
  '/_next/static/(.*)', // Next.js static files
  '/_next/webpack-hmr', // Webpack hot updates
  '/favicon.ico'        // Favicon
]);

export default clerkMiddleware((auth, request) => {
  // Bypass authentication for public routes and static files
  if (isPublicRoute(request) || isStaticFile(request)) {
    return NextResponse.next();
  }

  // Apply authentication protection to other routes
  auth().protect();
});

export const config = {
  matcher: [
    // Apply middleware to all routes except those specified in isPublicRoute and isStaticFile
    '/((?!_next|favicon.ico|static/).*)',
    '/(api|trpc)(.*)',
  ],
};
