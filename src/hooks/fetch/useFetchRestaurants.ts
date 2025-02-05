import useSWRInfinite from "swr/infinite";
import type { Restaurant } from "~/types/restaurant";

type Options = {
	setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
	pageSize: number;

	// キーワード検索
	keyword: string | undefined;
	// 現在地から検索
	position: GeolocationPosition | undefined;
};

export const useFetchRestaurants = ({
	setHasMore,
	pageSize,
	keyword,
	position,
}: Options) => {
	const params = (() => {
		if (keyword) {
			return `large_area=Z011&keyword=${keyword}`;
		}

		if (position) {
			return `lat=${position.coords.latitude}&lng=${position.coords.longitude}&range=5`;
		}

		return "large_area=Z011";
	})();

	const getKey = (pageIndex: number, previousPageData: Restaurant | null) => {
		if (previousPageData && !previousPageData.results.shop.length) {
			setHasMore(false);
			return null;
		}
		return `/api/restaurants?${params}&start=${pageIndex * pageSize + 1}&count=${pageSize}`;
	};

	const fetcher = (url: string): Promise<Restaurant> =>
		fetch(url).then((res) => res.json());

	return useSWRInfinite<Restaurant>(getKey, fetcher);
};
