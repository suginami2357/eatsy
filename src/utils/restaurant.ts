import * as turf from "@turf/turf";
import type { Restaurant } from "~/types/restaurant";

export function formatData(restaurants: Restaurant[] | undefined) {
	if (!restaurants) return [];

	return restaurants
		.flatMap((x) => x.results.shop)
		.map((item) => {
			return {
				...item,
				genre: formatGenre(item.genre),
				card: formatCard(item.card),
				station_name: formatStationName(item.station_name),
				budget: formatBudget(item.budget),
				mobile_access: formatMobileAccess(item.mobile_access),
				open: formatOpen(item.open),
				non_smoking: formatNonSmoking(item.non_smoking),
			};
		})
		.filter((x) => Object.values(x).every((value) => value !== undefined));
}

function formatGenre(value: {
	code: string;
	name: string;
	catch: string;
}) {
	return {
		code: value.code,
		name: value.name
			.split("・")
			.reduce((a, b) => (a.length > b.length ? a : b)),
		catch: value.catch,
	};
}

function formatStationName(value: string): string {
	return `${value}駅`;
}

function formatBudget(value: {
	code: string;
	name: string;
	average: string;
}) {
	return {
		code: value.code,
		name: `～${Number(
			value.name.replace("円", "").split("～")?.[1],
		).toLocaleString()}円`,
		average: Number(value.average),
	};
}

function formatMobileAccess(value: string): string | undefined {
	let result = value;

	// キーワードが含まれて無ければ "-" を返す
	if (!["駅", "徒歩"].every((keyword) => result.includes(keyword))) {
		return undefined;
	}

	// ◆♪,☆★●◎!※で分割してキーワードが無ければ削除
	result = result
		.split(/◆|♪|,|☆|★|●|◎|!|※|｡/)
		.filter((part) => ["JR", "線", "駅", "徒歩"].some((x) => part.includes(x)))
		.join("");

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

	// 【】《》『』 中に "駅" が無ければ削除
	result = result.replace(/【[^】]*】|《[^》]*》|『[^』]*』/g, (match) =>
		match.includes("駅") ? match : "",
	);

	// 【】《》『』を削除
	result = result.replace(/[【】《》『』]/g, "");

	// "," →　"/" に変換
	result = result.replace(/,/g, "/");

	// 一番最後の "分" "秒" より後方を削除
	result = result.replace(/(分|秒)[^分秒]*$/, "$1");

	return result;
}

function formatOpen(value: string): string {
	return value.replace(/\（.*?\）/g, "");
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
