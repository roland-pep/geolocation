import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const { country } = await req.json();

      const response = new Response(
        JSON.stringify({ message: "Preferences updated" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            // Setting the cookie in the response
            "Set-Cookie": `country=${country}; Path=/; HttpOnly; SameSite=Lax`,
          },
        }
      );

      return response;
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Error processing your request" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } else {
    return new Response(null, { status: 405 });
  }
}
