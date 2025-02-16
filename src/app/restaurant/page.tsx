"use client";
import clsx from "clsx";
import type React from "react";
import { useEffect, useState } from "react";
import { MobileView } from "react-device-detect";
import { BsFillCreditCardFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { FaCircleChevronRight, FaLocationDot } from "react-icons/fa6";
import { IoMdTrain } from "react-icons/io";
import { IoLocationSharp, IoTime } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { MdLocationOn, MdRestaurant } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import { TiLocationArrow } from "react-icons/ti";
import RestaurantList from "~/components/restaurants/RestaurantList";
import SearchForm from "~/components/restaurants/SearchForm";
import ChevronButton from "~/components/ui/chevron-button";
import Sidebar from "~/components/ui/sidebar";
import { useFetchRestaurants } from "~/hooks/fetch/useFetchRestaurants";
import type { SearchParams } from "~/types/restaurant";

export default function Page() {
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

	useEffect(() => {
		document.body.style.overflow = isModalOpen ? "hidden" : "auto";
	}, [isModalOpen]);

	const fetch = useFetchRestaurants({
		setHasMore,
		pageSize: 10,
		searchParams,
	});
	const { isLoading, mutate } = fetch;

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

			<RestaurantList fetch={fetch} hasMore={hasMore} position={position} />

			{!isLoading && (
				<>
					<ChevronButton
						className={clsx(
							"fixed flex items-center justify-center z-30 left-2 bottom-8 w-12 h-12 bg-white text-gray-900 rounded-full shadow-lg",
							scrollY > 1000 &&
								"bg-white/50 backdrop-blur-[6px] backdrop-contrast-[4]",
						)}
						style={{ opacity: scrollY < 1000 ? 1 - scrollY / 2000 : 1 }}
						isOpen={isModalOpen}
						setIsOpen={setIsModalOpen}
					/>
					{scrollY < 1000 && !position && (
						<button
							type="button"
							className="fixed flex items-center justify-center z-10 bottom-9 w-40 h-10 bg-gray-950 text-white rounded-full shadow-2xl"
							style={{ opacity: 1 - scrollY / 1000 }}
							onClick={handleLocationButtonClick}
						>
							<MdLocationOn size={20} />
							<span className="ml-2 text-sm">現在地から探す</span>
						</button>
					)}
				</>
			)}

			<Sidebar isOpen={isModalOpen}>
				<SearchForm
					position={position}
					handleKeyDown={handleKeyDown}
					handleLocationButtonClick={handleLocationButtonClick}
					handleSearchButtonClick={handleSearchButtonClick}
				/>
			</Sidebar>
		</div>
	);
}
