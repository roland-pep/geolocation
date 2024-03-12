import { NextRequest, NextResponse } from "next/server";
import countries from "./lib/countries.json";
import type { Country, Currency } from "./types/country";

export const config = {
  matcher: "/",
};

export function middleware(req: NextRequest) {
  const { geo, cookies, nextUrl: url } = req;

  // Correctly accessing the cookie value
  const country = cookies.get("country")?.value || geo.country || "US";

  const countryInfo = getCountryInfo(country);
  const currencyCode = getPreference(cookies, "currencyCode", () =>
    getDefaultCurrencyCode(countryInfo)
  );
  const currency = countryInfo.currencies[currencyCode] as Currency;

  const languages = getPreference(cookies, "languages", () =>
    getDefaultLanguages(countryInfo)
  );

  setUrlSearchParams(url, { country, currencyCode, currency, languages });

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

function getCountryInfo(countryCode: string): Country {
  const countryInfo = countries.find(
    (country: Country) => country.cca2 === countryCode
  );
  if (!countryInfo) throw new Error("Country information not found");
  return countryInfo;
}

function getDefaultCurrencyCode(countryInfo: Country): string {
  return Object.keys(countryInfo.currencies)[0];
}

function getDefaultLanguages(countryInfo: Country): string {
  return Object.values(countryInfo.languages).join(", ");
}

function getPreference<T>(
  cookies: NextRequest["cookies"],
  key: string,
  defaultValue: () => T
): T {
  const value = cookies.get(key)?.value;
  return value ? (value as unknown as T) : defaultValue();
}

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
