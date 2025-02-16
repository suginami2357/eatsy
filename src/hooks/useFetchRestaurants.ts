import useSWRInfinite from "swr/infinite";
import type { Restaurant, SearchParams } from "~/types/restaurant";

type Options = {
	setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
	pageSize: number;
	searchParams: SearchParams;
};

export const useFetchRestaurants = ({
	setHasMore,
	pageSize,
	searchParams,
}: Options) => {
	const { keyword, position } = searchParams;

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
