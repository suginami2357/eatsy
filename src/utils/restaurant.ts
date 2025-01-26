export function formatNonSmoking(value: string): string {
	switch (value) {
		case "禁煙席なし":
			return "全席喫煙可";
		case "一部禁煙":
			return "分煙";
		case "全面禁煙":
			return "全席禁煙";
		default:
			return "-";
	}
}

export function formatAccess(value: string): string {
	let result = value;

	const keywords = ["駅", "徒歩", "分", "秒", "m", "階", "F"];

	// キーワードが含まれて無ければ "-" を返す
	if (!keywords.some((keyword) => result.includes(keyword))) {
		return "-";
	}

	// "," →　"/" に変換
	result = result.replace(/,/g, "/");

	// 【】《》『』 中に "駅" が無ければ削除
	result = result.replace(/【[^】]*】|《[^》]*》|『[^』]*』/g, (match) =>
		match.includes("駅") ? match : "",
	);

	// ◆♪,☆★●◎!※で分割してキーワードが無ければ削除
	result = result
		.split(/◆|♪|,|☆|★|●|◎|!|※/)
		.filter((part) => keywords.some((x) => part.includes(x)))
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
