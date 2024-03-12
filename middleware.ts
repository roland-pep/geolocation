import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/",
};

export function middleware(req: NextRequest) {
  const { geo, cookies, nextUrl: url } = req;

  const country = cookies.get("country")?.value || geo.country || "US";

  setUrlSearchParams(url, { country });

  const response = NextResponse.rewrite(url);
  // Set the country in the cookies if it's not already set or is different
  if (cookies.get("country")?.value !== country) {
    response.cookies.set("country", country, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return response;
}

function getPreference<T>(
  cookies: NextRequest["cookies"],
  key: string,
  defaultValue: () => T
): T {
  const value = cookies.get(key)?.value;
  return value ? (value as unknown as T) : defaultValue();
}

// This function sets the URL search params (props) based on the provided object
function setUrlSearchParams(url: URL, params: Record<string, any>) {
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(
      key,
      typeof value === "object" && value !== null
        ? JSON.stringify(value)
        : value
    );
  });
}
