import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // Define public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/login",
    "/forgot-password",
    "/about",
    "/contact",
  ];
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Define role-based routes
  const adminRoutes = ["/dashboard/admin"];
  const shopRoutes = ["/dashboard/shop"];
  const supplierRoutes = ["/dashboard/supplier"];
  const driverRoutes = ["/dashboard/driver"];

  // Check if the current route matches any role-based route
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isShopRoute = shopRoutes.some((route) => pathname.startsWith(route));
  const isSupplierRoute = supplierRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isDriverRoute = driverRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect logic
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated) {
    const userRole = token.role as string;

    if (isAdminRoute && userRole !== "admin") {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url)
      );
    }

    if (isShopRoute && userRole !== "shop" && userRole !== "admin") {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url)
      );
    }

    if (isSupplierRoute && userRole !== "supplier" && userRole !== "admin") {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url)
      );
    }

    if (isDriverRoute && userRole !== "driver" && userRole !== "admin") {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url)
      );
    }

    if (pathname === "/login") {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /**
     * Match all paths except for:
     * - API routes
     * - _next static files
     * - _next image optimization
     * - favicon
     * - public assets like images/uploads/assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|uploads|assets).*)",
  ],
};
