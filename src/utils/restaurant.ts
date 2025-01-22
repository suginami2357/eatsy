export function formatNonSmoking(value: string): string {
	switch (value) {
		case "禁煙席なし":
			return "可";
		case "一部禁煙":
			return "分煙";
		case "全面禁煙":
			return "不可";
		default:
			return "-";
	}
}
