import type { NextApiRequest, NextApiResponse } from "next";

type Preferences = {
  country: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { country }: Preferences = req.body;

  // Example of setting headers, adjust for real use
  res.setHeader("Set-Cookie", [
    `country=${country}; Path=/; HttpOnly; SameSite=Lax`,
  ]);

  res.status(200).json({ message: "Preferences updated" });
}
