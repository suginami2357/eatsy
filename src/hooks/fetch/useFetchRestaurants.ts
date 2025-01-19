import useSWRInfinite from "swr/infinite";
import type { Restaurant } from "~/types/restaurant";

type options = {
	setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
	pageSize: number;
};

export const useFetchRestaurants = ({ setHasMore, pageSize }: options) => {
	const getKey = (pageIndex: number, previousPageData: Restaurant | null) => {
		if (previousPageData && !previousPageData.results.shop.length) {
			setHasMore(false);
			return null;
		}
		const start = pageIndex * pageSize + 1;
		return `/api/restaurants?largeArea=Z011&start=${start}&count=${pageSize}`;
	};

	const fetcher = (url: string): Promise<Restaurant> =>
		fetch(url).then((res) => res.json());

	return useSWRInfinite<Restaurant>(getKey, fetcher);
};
