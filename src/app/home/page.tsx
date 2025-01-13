"use client";
import React from "react";
import { useFetchRestaurants } from "~/hooks/fetch/useFetchRestaurants";

export default function HomePage() {
	const { data, isLoading, error } = useFetchRestaurants();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			{data?.results?.shop?.map((x) => (
				<div key={x.id}>{x.name}</div>
			))}
		</div>
	);
}
