import useSWRInfinite from "swr/infinite";
import type { Restaurant } from "~/types/restaurant";

type Options = {
	setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
	pageSize: number;
	position: GeolocationPosition | undefined;
};

export const useFetchRestaurants = ({
	setHasMore,
	pageSize,
	position,
}: Options) => {
	const getKey = (pageIndex: number, previousPageData: Restaurant | null) => {
		if (previousPageData && !previousPageData.results.shop.length) {
			setHasMore(false);
			return null;
		}
		const params = position
			? `lat=${position.coords.latitude}&lng=${position.coords.longitude}&range=5`
			: "large_area=Z011";

		return `/api/restaurants?${params}&start=${pageIndex * pageSize + 1}&count=${pageSize}`;
	};

	const fetcher = (url: string): Promise<Restaurant> =>
		fetch(url).then((res) => res.json());

	return useSWRInfinite<Restaurant>(getKey, fetcher);
};
