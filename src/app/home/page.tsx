"use client";
import clsx from "clsx";
import type React from "react";
import { useState } from "react";
import { IoMdTrain } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { MdRestaurant } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import { TiLocationArrow } from "react-icons/ti";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFetchRestaurants } from "~/hooks/fetch/useFetchRestaurants";
import { formatAccess } from "~/utils/restaurant";

export default function HomePage() {
	const [hasMore, setHasMore] = useState(true);

	const {
		data: restaurants,
		size,
		setSize,
	} = useFetchRestaurants({
		setHasMore,
		pageSize: 10,
	});

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLElement>,
		id: string,
		handleClick: (id: string) => void,
	) => {
		e.key === "Enter" && handleClick(id);
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
						<div className="m-2 text-xs text-gray-600">
							<img
								className={clsx("h-[21dvh] w-dvw rounded object-cover")}
								src={x.photo.pc.l}
								alt={x.name}
							/>
							<div className="font-bold my-1 text-base text-gray-900">
								<a href={x.urls.pc} target="_blank" rel="noopener noreferrer">
									{x.name}
								</a>
							</div>
							<div className="flex gap-x-4">
								<div className="flex">
									<div className="h-4 w-4 bg-gray-300 rounded-full">
										<MdRestaurant size={12} className="text-white m-0.5" />
									</div>
									<span className="ml-1">{x.genre.name}</span>
								</div>
								<div className="flex">
									<div className="h-4 w-4 bg-gray-300 rounded-full">
										<IoMdTrain size={12} className="text-white m-0.5" />
									</div>
									<span className="ml-1">{x.station_name}駅</span>
								</div>
								<div className="flex">
									<div className="h-4 w-4 bg-gray-300 rounded-full">
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

							<div className="mt-2 text-xs text-gray-600">
								<div className="flex">
									<div className="h-4 w-4 bg-gray-300 rounded-full">
										<TiLocationArrow size={16} className="text-white" />
									</div>
									<div className="ml-1">{formatAccess(x.mobile_access)}</div>
								</div>
								<div className="flex mt-1">
									<div className="h-4 w-4 bg-gray-300 rounded-full">
										<IoTime size={12} className="text-white m-0.5" />
									</div>
									<div className="ml-1">{x.open.replace(/\（.*?\）/g, "")}</div>
								</div>

								{/* <div className="flex items-center">
										<div className="h-4 w-4 bg-gray-300 rounded-full">
											<IoLocationSharp size={12} className="text-white m-0.5" />
										</div>
										<div className="ml-1">{x.address}</div>
									</div> */}

								{/* <div className="flex items-center mt-3">
										<div className="h-4 w-4 bg-gray-300 rounded-full">
											<BiChair size={12} className="text-white m-0.5" />
										</div>
										<div className="ml-1">{x.capacity}席</div>
									</div> */}
								{/* <div className="flex items-center mt-2">
										<div className="h-4 w-4 bg-gray-300 rounded-full">
											<MdSmokingRooms size={12} className="text-white m-0.5" />
										</div>
										<div className="ml-1">
											{formatNonSmoking(x.non_smoking)}
										</div>
									</div> */}
								{/* <div className="flex items-center mt-1">
										<div className="h-4 w-4 bg-gray-300 rounded-full">
											<GiMeat size={12} className="text-white m-0.5" />
										</div>
										<div className="ml-1">
											食べ放題{formatYesNo(x.free_food)}
										</div>
									</div>
									<div className="flex items-center mt-1">
										<div className="h-4 w-4 bg-gray-300 rounded-full">
											<RiDrinks2Fill size={12} className="text-white m-0.5" />
										</div>
										<div className="ml-1">
											飲み放題{formatYesNo(x.free_drink)}
										</div>
									</div> */}
								{/* <div className="flex items-center mt-1">
										<div className="h-4 w-4 bg-gray-300 rounded-full">
											<BsFillCreditCardFill
												size={12}
												className="text-white m-0.5"
											/>
										</div>
										<div className="ml-1">クレジットカード{x.card}</div>
									</div> */}
							</div>
						</div>
					</div>
				))}
			</InfiniteScroll>
		</div>
	);
}
