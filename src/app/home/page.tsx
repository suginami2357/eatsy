"use client";
import clsx from "clsx";
import type React from "react";
import { useEffect, useState } from "react";
import { MobileView } from "react-device-detect";
import { BsFillCreditCardFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
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
import type { SearchParams } from "~/types/restaurant";
import { formatData, formatDistance } from "~/utils/restaurant";

export default function HomePage() {
	// TODO: MobileView =　true モーダルで画面外をクリックすると閉じる

	const [hasMore, setHasMore] = useState(true);
	const [scrollY, setScrollY] = useState(0);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchParams, setSearchParams] = useState<SearchParams>({
		keyword: "",
		position: undefined,
	});
	const { keyword, position } = searchParams;

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const {
		data: restaurants,
		size,
		setSize,
		isLoading,
		mutate,
	} = useFetchRestaurants({
		setHasMore,
		pageSize: 10,
		searchParams,
	});
	const data = formatData(restaurants);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;

		if (event.key === "Enter") {
			setSearchParams({ keyword: value, position: undefined });
			mutate();
			setIsModalOpen(false);
		}
	};

	const handleLocationButtonClick = () => {
		if (position) {
			setSearchParams({ keyword, position: undefined });
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setSearchParams({ keyword: "", position });
			},
			undefined,
			{ enableHighAccuracy: true },
		);
		mutate();
	};

	const handleSearchButtonClick = () => {
		setSearchParams({ keyword, position });
		mutate();
		setIsModalOpen(false);
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
							"flex items-center justify-center",
							isLoading ? "w-[100dvw] h-[calc(100dvh-8px)]" : "h-16",
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

								{/* 「現在地から探す」で表示 */}
								{position ? (
									<div className="flex">
										<div className="h-4 w-4 bg-gray-300 rounded-full">
											<IoLocationSharp size={12} className="text-white m-0.5" />
										</div>
										<span className="ml-1">
											現在地から{formatDistance(position, x.lng, x.lat)}
										</span>
									</div>
								) : (
									<div className="flex">
										<div className="h-4 w-4 bg-gray-300 rounded-full">
											<IoLocationSharp size={12} className="text-white m-0.5" />
										</div>
										<span className="ml-1">{x.middle_area.name}</span>
									</div>
								)}

								{/* <div className="flex">
									<div className="h-4 w-4 bg-gray-300 rounded-full">
										<MdModeNight size={12} className="text-white m-0.5" />
									</div>
									<span className="ml-1">{x.budget.name}</span>
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
				<>
					<button
						type="button"
						className="z-30 fixed flex items-center justify-center bottom-8 left-2 w-12 h-12 bg-white/45 text-gray-900 rounded-full backdrop-blur-[6px] backdrop-contrast-[4] shadow-lg"
						onClick={() => setIsModalOpen(!isModalOpen)}
					>
						{isModalOpen ? (
							<FaChevronLeft size={24} />
						) : (
							<FaChevronRight size={24} />
						)}
					</button>

					{scrollY < 1000 && !position && (
						<button
							type="button"
							className="fixed flex items-center justify-center z-10 bottom-9 w-40 h-10 bg-green-600 text-white rounded-full shadow-2xl"
							style={{ opacity: 1 - scrollY / 1000 }}
							onClick={handleLocationButtonClick}
						>
							<MdLocationOn size={20} />
							<span className="ml-2 text-sm">現在地から探す</span>
						</button>
					)}
				</>
			)}

			<div
				className={clsx(
					"flex fixed inset-0 z-20 transform transition-transform duration-300 ease-in-out",
					isModalOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				<div className="w-80 h-full bg-white shadow-lg">
					<div className="m-8 text-gray-900">
						{/* キーワード検索 */}
						<div className="flex items-center my-12 rounded-md shadow-xs">
							<div className="mx-1">
								<BsSearch size={18} className="text-gray-500" />
							</div>
							<div>
								<input
									className="ml-2 w-full text-2xl font-bold outline-none placeholder-gray-500"
									placeholder="検索"
									autoCorrect="off"
									autoCapitalize="off"
									autoComplete="off"
									spellCheck="false"
									onKeyDown={handleKeyDown}
								/>
							</div>
						</div>

						{/* 現在地から探す */}
						<div>
							<label className="flex items-center cursor-pointer">
								<input
									type="checkbox"
									className="hidden"
									onChange={handleLocationButtonClick}
								/>
								<div
									className={clsx(
										"w-10 h-6 bg-gray-300 rounded-full relative transition-colors duration",
										position && "bg-green-600",
									)}
								>
									<div
										className={clsx(
											"absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300",
											position && "translate-x-4",
										)}
									/>
								</div>
								<span className="mx-2">現在地から探す</span>
							</label>

							<button
								type="button"
								className="fixed flex items-center justify-center z-10 bottom-9 w-40 h-10 bg-green-600 text-white rounded-full shadow-2xl"
								onClick={handleSearchButtonClick}
							>
								<span className="ml-2 text-sm">検索</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
