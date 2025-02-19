"use client";
import clsx from "clsx";
import type React from "react";
import { useState } from "react";
import { BsFillCreditCardFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { FaCircleChevronRight, FaLocationDot } from "react-icons/fa6";
import { IoMdTrain } from "react-icons/io";
import { IoLocationSharp, IoTime } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { MdLocationOn, MdRestaurant } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import { TiLocationArrow } from "react-icons/ti";
import CreditDisplay from "~/components/restaurants/CreditDisplay";
import RestaurantList from "~/components/restaurants/RestaurantList";
import SearchForm from "~/components/restaurants/SearchForm";
import ChevronButton from "~/components/ui/chevron-button";
import Sidebar from "~/components/ui/sidebar";
import { useDevice } from "~/hooks/useDevice";
import { useFetchRestaurant } from "~/hooks/useFetchRestaurant";
import { useScroll } from "~/hooks/useScroll";
import type { SearchParams } from "~/types/restaurant";

export default function Page() {
	const { isMobile } = useDevice();
	const { scrollY } = useScroll();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchParams, setSearchParams] = useState<SearchParams>({});

	const fetch = useFetchRestaurant({
		pageSize: 10,
		searchParams,
	});
	const { isLoading, mutate } = fetch;

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;

		if (event.key === "Enter") {
			setSearchParams({ ...searchParams, keyword: value, position: undefined });
			mutate();
			setIsModalOpen(false);
		}
	};

	const handleLocationButtonClick = () => {
		if (searchParams.position) {
			setSearchParams({ ...searchParams, position: undefined });
			return;
		}

		navigator.geolocation.getCurrentPosition((position) =>
			setSearchParams({ ...searchParams, keyword: "", position }),
		);
		mutate();
	};

	return (
		<div className="flex flex-col items-center">
			<CreditDisplay className="h-2 text-[6px] text-gray-600" />
			<RestaurantList fetch={fetch} searchParams={searchParams} />

			{!isLoading && (
				<ChevronButton
					className={clsx(
						"fixed flex items-center justify-center z-30 left-2 bottom-8 w-12 h-12 bg-white text-gray-900 rounded-full shadow-lg",
						isMobile &&
							scrollY > 1000 &&
							"bg-white/50 backdrop-blur-[6px] backdrop-contrast-[4]",
					)}
					style={
						isMobile ? { opacity: scrollY < 1000 ? 1 - scrollY / 2000 : 1 } : {}
					}
					isOpen={isModalOpen}
					setIsOpen={setIsModalOpen}
				/>
			)}

			<Sidebar
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				showOverlay={isMobile}
			>
				<SearchForm
					searchParams={searchParams}
					setSearchParams={setSearchParams}
					handleKeyDown={handleKeyDown}
					handleLocationButtonClick={handleLocationButtonClick}
				/>
			</Sidebar>
		</div>
	);
}
