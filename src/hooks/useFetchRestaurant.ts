import { useState } from "react";
import type { SWRInfiniteResponse } from "swr/infinite";
import useSWRInfinite from "swr/infinite";
import type { Restaurant, SearchParams } from "~/types/restaurant";

type Options = {
	params: SearchParams;
	pageSize: number;
};

export type FetchRestaurantResponse = SWRInfiniteResponse<Restaurant, Error> & {
	hasMore: boolean;
};

export const useFetchRestaurant = ({
	params,
	pageSize,
}: Options): FetchRestaurantResponse => {
	const { keyword, position } = params;

	const [hasMore, setHasMore] = useState(true);

	const query = (() => {
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
		return `/api/restaurants?${query}&start=${pageIndex * pageSize + 1}&count=${pageSize}`;
	};

	const fetcher = (url: string): Promise<Restaurant> =>
		fetch(url).then((res) => res.json());

	return { ...useSWRInfinite<Restaurant>(getKey, fetcher), hasMore };
};
