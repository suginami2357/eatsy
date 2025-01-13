"use client";
import clsx from "clsx";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdRestaurant } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import { useFetchRestaurants } from "~/hooks/fetch/useFetchRestaurants";

export default function HomePage() {
	const { data, isLoading, error } = useFetchRestaurants();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="flex flex-col bg-gray-300 items-center">
			<div className="text-xs text-white" style={{ fontSize: "8px" }}>
				Powered by
				<a href="http://webservice.recruit.co.jp/">
					ホットペッパーグルメ Webサービス
				</a>
			</div>
			{data?.results?.shop?.map((x, index) => (
				<div
					key={x.id}
					className={clsx(
						"flex flex-col max-w-md bg-white rounded",
						index === 0 ? "mb-2 mx-2" : "m-2",
					)}
				>
					<div className="m-2">
						<img
							src={x.photo.pc.l}
							alt={x.name}
							className="h-[21dvh] w-dvw rounded object-cover"
						/>
						<div className="text-base font-bold my-1">{x.name}</div>
						<div className="flex gap-x-4">
							<div className="flex items-center text-xs text-gray-600">
								<div className="relative items-center justify-center bg-gray-300 rounded-full">
									<MdRestaurant size={12} className="text-white m-0.5" />
								</div>
								<span className="ml-1">{x.genre.name}</span>
							</div>
							<div className="flex items-center text-xs text-gray-600">
								<div className="relative items-center justify-center bg-gray-300 rounded-full">
									<IoLocationSharp size={12} className="text-white m-0.5" />
								</div>
								<span className="ml-1">{x.station_name}駅</span>
							</div>
							<div className="flex items-center text-xs text-gray-600">
								<div className="relative items-center justify-center bg-gray-300 rounded-full">
									<MdModeNight size={12} className="text-white m-0.5" />
								</div>
								<span className="ml-1">
									～
									{Number(
										x.budget.name.replace("円", "").split("～")[1],
									).toLocaleString()}
									円
								</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
