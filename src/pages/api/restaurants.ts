// pages/api/restaurants.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = process.env.NEXT_PUBLIC_RESTAURANT_API_KEY;
  const largeArea ='Z011'
  const response = await fetch(`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&format=json&large_area=${largeArea}`);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json();
  res.status(response.status).json(data);

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data
};

export default handler;
