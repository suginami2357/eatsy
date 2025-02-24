import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const apiKey = process.env.RESTAURANT_API_KEY;
		if (!apiKey) {
			throw new Error("API key is not defined");
		}

		// クエリパラメータを動的に構築
		const params = new URLSearchParams({ key: apiKey, format: "json" });
		for (const key of Object.keys(req.query)) {
			req.query[key] && params.append(key, req.query[key].toString());
		}

		const response = await fetch(
			`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${params.toString()}`,
		);

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data = await response.json();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ results: { shop: [] } });
	}
}
