import { useState } from "react";
import type { SWRInfiniteResponse } from "swr/infinite";
import useSWRInfinite from "swr/infinite";
import type { RestaurantResponse, SearchParams } from "~/types/restaurant";

type Options = {
	params: SearchParams;
	pageSize: number;
};

export type FetchRestaurantResponse = SWRInfiniteResponse<
	RestaurantResponse,
	Error
> & {
	hasMore: boolean;
};

export const useFetchRestaurant = ({
	params,
	pageSize,
}: Options): FetchRestaurantResponse => {
	const { keyword, genre, position, ...rest } = params;

	const [hasMore, setHasMore] = useState(true);

	const query = (() => {
		let result = "large_area=Z011";

		if (keyword) {
			result += `&keyword=${keyword}`;
		}

		// if (genre.length) {
		// 	result += `&genre=${genre}`;
		// }

		if (position) {
			result += `&lat=${position.coords.latitude}&lng=${position.coords.longitude}&range=5`;
		}

		result += Object.entries(rest)
			.filter(([, value]) => value)
			.map(([key]) => `&${key}=1`)
			.join("");

		return result;
	})();

	const getKey = (
		pageIndex: number,
		previousPageData: RestaurantResponse | null,
	) => {
		if (previousPageData && !previousPageData.results.shop.length) {
			setHasMore(false);
			return null;
		}
		return `/api/restaurants?${query}&start=${pageIndex * pageSize + 1}&count=${pageSize}`;
	};

	const fetcher = (url: string): Promise<RestaurantResponse> =>
		fetch(url).then((res) => res.json());

	const response = useSWRInfinite<RestaurantResponse>(getKey, fetcher);

	// 最初のページでデータがない場合、hasMore を false にする
	// これにより、InfiniteScroll が最初のページでロードされない
	if (
		hasMore &&
		!response.isLoading &&
		!response.data?.[0]?.results.shop.length
	) {
		setHasMore(false);
	}

	return { ...response, hasMore };
};
