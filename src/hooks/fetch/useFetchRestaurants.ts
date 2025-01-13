import useSWR from "swr";
import type { Restaurant } from "~/types/restaurant";

export const useFetchRestaurants = () => {
	const fetcher = (url: string): Promise<Restaurant> =>
		fetch(url).then((res) => res.json());

	return useSWR<Restaurant>("/api/restaurants", fetcher);
};
