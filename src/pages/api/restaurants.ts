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
		const queryParams = new URLSearchParams({ key: apiKey, format: "json" });

		// 他のクエリパラメータを追加
		// const otherParams = req.query;
		for (const key of Object.keys(req.query)) {
			if (req.query[key]) {
				queryParams.append(key, req.query[key].toString());
			}
		}

		// const { range } = req.query;

		const response = await fetch(
			`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${queryParams.toString()}`,
		);

		// const response = await fetch(
		// 	`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&format=json&large_area=${large_area}&start=${start}&count=${count}`,
		// );

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data = await response.json();
		res.status(200).json(data);
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
