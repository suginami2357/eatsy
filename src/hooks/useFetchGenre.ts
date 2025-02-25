import useSWR from "swr";
import type { Genre } from "~/types/restaurant";

export const useFetchGenre = () => {
	const fetcher = (url: string) => fetch(url).then((res) => res.json());

	return useSWR<Genre>("/api/genre", fetcher);
};
