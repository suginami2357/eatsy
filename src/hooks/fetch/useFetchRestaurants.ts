import useSWRInfinite from "swr/infinite";
import type { Restaurant } from "~/types/restaurant";

type options = {
	setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
	pageSize: number;
	position: GeolocationPosition | undefined;
};

export const useFetchRestaurants = ({
	setHasMore,
	pageSize,
	position,
}: options) => {
	const getKey = (pageIndex: number, previousPageData: Restaurant | null) => {
		if (previousPageData && !previousPageData.results.shop.length) {
			setHasMore(false);
			return null;
		}
		const query = position
			? `lat=${position.coords.latitude}&lng=${position.coords.longitude}&range=1`
			: "large_area=Z011";

		return `/api/restaurants?${query}&start=${pageIndex * pageSize + 1}&count=${pageSize}`;
	};

	const fetcher = (url: string): Promise<Restaurant> =>
		fetch(url).then((res) => res.json());

	return useSWRInfinite<Restaurant>(getKey, fetcher);
};
