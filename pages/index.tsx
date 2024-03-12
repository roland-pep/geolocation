import Image from "next/image";
import map from "../public/map.svg";
import { useState } from "react";

export const getServerSideProps = ({ query }) => ({
  props: query,
});

export default function Index({
  languages,

  country,
  currencyCode,
}) {
  const [selectedCountry, setSelectedCountry] = useState(country);

  const updateCountryPreference = async (newCountry: string) => {
    await fetch("/api/updatePreferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: newCountry }),
    });
    window.location.reload(); // Optionally, consider updating the UI without reloading
  };

  const handleCountryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCountry = event.target.value;
    setSelectedCountry(newCountry); // Update state to ensure UI consistency
    await updateCountryPreference(newCountry); // Submit new preference immediately
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="fixed inset-0 overflow-hidden opacity-75 bg-[#f8fafb]">
        <Image alt="World Map" src={map} fill={true} quality={100} />
      </div>
      <main className="flex flex-col items-center flex-1 px-4 sm:px-20 text-center z-10 pt-8 sm:pt-20">
        <h1 className="text-3xl sm:text-5xl font-bold">Geolocation</h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-700">
          Your preferred country is set to <strong>{country}</strong>.
        </p>
        <a
          className="flex items-center mt-4 text-md sm:text-lg text-blue-500 hover:underline"
          href="https://vercel.com/docs/edge-network/headers#request-headers?utm_source=geo-ip-demo&utm_campaign=geo-ip-demo"
          target="_blank"
          rel="noreferrer"
        >
          View Documentation
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            className="ml-1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </a>
        <section className="border border-gray-300 bg-white rounded-lg shadow-lg mt-16 w-full hover:shadow-2xl transition">
          <div className="p-4 flex justify-center items-between border-b">
            <div className="self-center">
              <Image
                alt={`${country} flag`}
                className="rounded-full"
                src={`https://flagcdn.com/96x72/${country.toLowerCase()}.png`}
                // src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
                width={32}
                height={32}
              />
            </div>
            <div className="ml-4 mr-auto text-left">
              <h4 className="font-semibold">{country}</h4>
            </div>
            <p className="self-center text-gray-700">{country}</p>
          </div>
          <div className="p-4 flex justify-center items-between border-b bg-gray-50">
            <h4 className="font-semibold text-left mr-auto">Languages</h4>
            <div className="self-center">
              <p className="text-gray-700">{languages}</p>
            </div>
          </div>
          <div className="p-4 flex justify-center items-between border-b bg-gray-50">
            <h4 className="font-semibold text-left mr-auto">Currency</h4>
            <p className="text-gray-700">{`${currencyCode} `}</p>
          </div>
          <div className="p-4 flexborder-b bg-gray-50 rounded-b-lg">
            <h4 className="font-semibold text-left">Geolocation Headers</h4>
            <pre className="bg-black text-white font-mono text-left py-2 px-4 rounded-lg mt-4 text-sm leading-6">
              <p>
                <strong>{"x-vercel-ip-country: "}</strong>
                {country}
              </p>
            </pre>
          </div>
        </section>{" "}
        <div className="p-4">
          <label htmlFor="country-select" className="mr-2">
            Choose your country:
          </label>
          <select
            id="country-select"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="border-gray-300 border rounded p-2"
          >
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
          </select>
        </div>
      </main>
    </div>
  );
}
