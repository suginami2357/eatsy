import * as turf from "@turf/turf";
import type { Restaurant } from "~/types/restaurant";

export function formatData(restaurants: Restaurant[] | undefined) {
	if (!restaurants) return [];

	const data = restaurants?.flatMap((x) => x.results.shop);

	const result = data
		.map((item) => {
			return {
				...item,
				genre: {
					code: item.genre.code,
					name: item.genre.name
						.split("・")
						.reduce((a, b) => (a.length > b.length ? a : b)),
					catch: item.genre.catch,
				},
				card: formatCard(item.card),
				station_name: `${item.station_name}駅`,
				budget: {
					code: item.budget.code,
					name: `～${Number(
						item.budget.name.replace("円", "").split("～")?.[1],
					).toLocaleString()}円`,
					average: Number(item.budget.average),
				},
				mobile_access: formatAccess(item.mobile_access),
				open: item.open.replace(/\（.*?\）/g, ""),
				non_smoking: formatNonSmoking(item.non_smoking),
			};
		})
		.filter((x) => Object.values(x).every((value) => value !== undefined));
	return result;
}

function formatCard(value: string): string | undefined {
	switch (value) {
		case "利用可":
			return "カード決済可";
		case "利用不可":
			return "現金のみ";
		default:
			return undefined;
	}
}

function formatNonSmoking(value: string): string | undefined {
	switch (value) {
		case "禁煙席なし":
			return "全席喫煙可";
		case "一部禁煙":
			return "分煙";
		case "全面禁煙":
			return "全席禁煙";
		default:
			return undefined;
	}
}

function formatAccess(value: string): string | undefined {
	let result = value;

	// キーワードが含まれて無ければ "-" を返す
	if (!["駅", "徒歩"].some((keyword) => result.includes(keyword))) {
		return undefined;
	}

	// "," →　"/" に変換
	result = result.replace(/,/g, "/");

	// 【】《》『』 中に "駅" が無ければ削除
	result = result.replace(/【[^】]*】|《[^》]*》|『[^』]*』/g, (match) =>
		match.includes("駅") ? match : "",
	);

	// ◆♪,☆★●◎!※で分割してキーワードが無ければ削除
	result = result
		.split(/◆|♪|,|☆|★|●|◎|!|※|｡/)
		.filter((part) =>
			["駅", "徒歩", "分", "秒", "m", "階", "F"].some((x) => part.includes(x)),
		)
		.join("");

	// 一番最後の"分","秒"より後ろを削除
	result = result.replace(/(分|秒)[^分秒]*$/, "$1");

	// 【】《》『』がペアでない場合は削除
	const pairs = [
		{ open: "【", close: "】" },
		{ open: "《", close: "》" },
		{ open: "『", close: "』" },
	];
	for (const pair of pairs) {
		const openMatch = result.match(new RegExp(`\\${pair.open}`, "g"));
		const closeMatch = result.match(new RegExp(`\\${pair.close}`, "g"));
		if (openMatch?.length !== closeMatch?.length) {
			result = result.replaceAll(pair.open, "").replaceAll(pair.close, "");
		}
	}

	return result;
}

export function formatDistance(
	position: GeolocationPosition | undefined,
	lng: number,
	lat: number,
) {
	if (position === undefined) return " - m";

	const referencePoint = [lng, lat];

	const userPoint = [
		position?.coords.longitude || 0,
		position?.coords.latitude || 0,
	];

	const distance = Math.floor(
		turf.distance(referencePoint, userPoint, { units: "meters" }),
	);
	return distance < 1000
		? `${distance.toLocaleString()}m`
		: `${Math.floor(distance / 1000).toLocaleString()}km`;
}
