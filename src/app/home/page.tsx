"use client";
import * as turf from "@turf/turf";
import clsx from "clsx";
import { motion } from "framer-motion";
import type React from "react";
import { useState } from "react";
import { BsFillCreditCardFill } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { FaCircleChevronRight, FaLocationDot } from "react-icons/fa6";
import { IoMdTrain } from "react-icons/io";
import { IoLocationSharp, IoTime } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { MdLocationOn, MdRestaurant } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import { TiLocationArrow } from "react-icons/ti";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFetchRestaurants } from "~/hooks/fetch/useFetchRestaurants";
import { formatData, formatDistance } from "~/utils/restaurant";

export default function HomePage() {
	const [hasMore, setHasMore] = useState(true);
	const [position, setPosition] = useState<GeolocationPosition>();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		data: restaurants,
		size,
		setSize,
		isLoading,
	} = useFetchRestaurants({
		setHasMore,
		pageSize: 10,
		position,
	});

	const data = formatData(restaurants);

	const handleLocationButtonClick = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setPosition(position);
			},
			undefined,
			{ enableHighAccuracy: true },
		);
	};

	return (
		<div className="flex flex-col items-center">
			<div className="h-2 text-[6px] text-gray-600">
				Powered by
				<a href="http://webservice.recruit.co.jp/">
					ホットペッパーグルメ Webサービス
				</a>
			</div>

			<InfiniteScroll
				dataLength={data?.length || 0}
				next={() => setSize(size + 1)}
				hasMore={hasMore}
				loader={
					// UIが固まったら animate-pulse を使用する
					<div
						className={clsx(
							"flex w-[100dvw] items-center justify-center",
							isLoading ? "h-[calc(100dvh-8px)]" : "h-16",
						)}
					>
						<div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" />
					</div>
				}
			>
				{data?.map((x, index) => (
					<div
						key={x.id}
						className={clsx(
							"flex flex-col max-w-md bg-white shadow-md rounded",
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
										<IoLocationSharp size={12} className="text-white m-0.5" />
									</div>
									<span className="ml-1">{x.middle_area.name}</span>
								</div>
								{/* <div className="flex">
									<div className="h-4 w-4 bg-gray-300 rounded-full">
										<MdModeNight size={12} className="text-white m-0.5" />
									</div>
									<span className="ml-1">{x.budget.name}</span>
								</div> */}
								{/* <div className="flex">
									<div className="h-4 w-4 bg-gray-300 rounded-full">
										<IoLocationSharp size={12} className="text-white m-0.5" />
									</div>
									<span className="ml-1">
										現在地から{formatDistance(position, x.lng, x.lat)}
									</span>
									<motion.button
										onClick={handleLocationButtonClick}
										whileTap={{ rotate: 720 }}
										className="ml-1 p-1 bg-blue-500 text-white rounded-xl"
									>
										<LuRefreshCw size={8} />
									</motion.button>
								</div> */}
							</div>

							<div className="mt-2 text-xs text-gray-600">
								<div className="flex">
									<div className="h-4 w-4 bg-gray-300 rounded-full">
										<TiLocationArrow size={16} className="text-white" />
									</div>
									<div className="ml-1">{x.mobile_access}</div>
								</div>
								{/* <div className="flex mt-1">
									<div className="h-4 w-4 bg-gray-300 rounded-full">
										<IoTime size={12} className="text-white m-0.5" />
									</div>
									<div className="ml-1">{x.open}</div>
								</div> */}

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

			{!isLoading && (
				<button
					type="button"
					className="z-10 fixed flex items-center justify-center bottom-8 left-2 w-12 h-12 bg-white/45 text-gray-900 rounded-full backdrop-blur-[6px] backdrop-contrast-[4] shadow-lg"
					onClick={() => setIsModalOpen(!isModalOpen)}
				>
					{isModalOpen ? (
						<FaChevronLeft size={24} />
					) : (
						<FaChevronRight size={24} />
					)}
				</button>
			)}

			<div
				className={clsx(
					"fixed inset-0 flex transform transition-transform duration-300 ease-in-out",
					isModalOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				<div className="bg-white w-80 h-full shadow-lg">
					<div className="p-4">
						{/* モーダルのコンテンツ */}
						<h2 className="text-xl font-bold">モーダルのタイトル</h2>
						<p>モーダルのコンテンツ</p>
					</div>
				</div>
			</div>
		</div>
	);
}
