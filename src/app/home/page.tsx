"use client";
import clsx from "clsx";
import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdRestaurant } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFetchRestaurants } from "~/hooks/fetch/useFetchRestaurants";

export default function HomePage() {
	const [hasMore, setHasMore] = useState(true);
	const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

	const {
		data: restaurants,
		size,
		setSize,
	} = useFetchRestaurants({
		setHasMore,
		pageSize: 10,
	});

	const handleClick = (id: string) => {
		setSelectedId(selectedId === id ? undefined : id);
	};

	const data = restaurants?.flatMap((x) => x.results.shop);

	return (
		<div className="flex flex-col bg-gray-200 items-center">
			<div className="h-2 text-[5px] text-white">
				Powered by
				<a href="http://webservice.recruit.co.jp/">
					ホットペッパーグルメ Webサービス
				</a>
			</div>
			<InfiniteScroll
				dataLength={data?.length || 0}
				next={() => setSize(size + 1)}
				hasMore={hasMore}
				loader={<div />}
			>
				{data?.map((x, index) => (
					<div
						key={x.id}
						className={clsx(
							"flex flex-col max-w-md bg-white rounded",
							index === 0 ? "mb-2 mx-2" : "m-2",
						)}
					>
						<button
							type="button"
							className="m-2"
							onClick={() => handleClick(x.id)}
						>
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
										<span>～</span>
										<span>
											{Number(
												x.budget.name.replace("円", "").split("～")?.[1],
											).toLocaleString()}
										</span>
										<span>円</span>
									</span>
								</div>
							</div>
							{x.id === selectedId && <div>aaaaaaaaa</div>}
						</button>
					</div>
				))}
			</InfiniteScroll>
		</div>
	);
}
