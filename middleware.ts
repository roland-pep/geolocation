import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/:country(us|gb)"], // Match the root and the specific country paths
};

export function middleware(req: NextRequest) {
  const { geo, cookies, nextUrl: url } = req;

  // Direct access to a specific country page (US or GB) bypasses geolocation and cookie checks
  const directAccessToCountry = url.pathname.match(/^\/(us|gb)$/);
  if (directAccessToCountry) {
    return NextResponse.next(); // Proceed without redirection
  }

  // Determine the country from cookie or geolocation
  const countryPreference =
    cookies.get("country")?.value || geo.country || "US";
  const normalizedCountryCode =
    countryPreference.toUpperCase() === "GB"
      ? "GB"
      : countryPreference.toUpperCase();

  // If the user is accessing the root without a direct country path, redirect based on preference
  if (url.pathname === "/") {
    const destinationUrl = url.clone(); // Clone the URL to modify it
    destinationUrl.pathname = `/${normalizedCountryCode.toLowerCase()}`; // Change to the preferred country path
    return NextResponse.redirect(destinationUrl);
  }

  // If accessing other paths, do nothing and let the request proceed
  return NextResponse.next();
}
