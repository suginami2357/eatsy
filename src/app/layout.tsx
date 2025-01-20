import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "楽食サーチ",
	description:
		"日本全国のレストランやグルメ情報を簡単検索！地域、ジャンル、予算に応じたおすすめの飲食店を見つけることができます。",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="ja" className={`${GeistSans.variable}`}>
			<body>{children}</body>
		</html>
	);
}
