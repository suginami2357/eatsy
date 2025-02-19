import clsx from "clsx";
import { BsSearch } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import type { SearchParams } from "~/types/restaurant";

type SearchFormProps = {
	/**  */
	searchParams: SearchParams;
	/**  */
	setSearchParams: (params: SearchParams) => void;
	/** 入力フィールドでキーボードのキーが押されたときに呼び出される関数 */
	// handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	// /** 現在地ボタンがクリックされたときに呼び出される関数 */
	// handleLocationButtonClick: () => void;
};

export default function SearchForm({
	searchParams,
	setSearchParams,
}: SearchFormProps) {
	const {
		keyword,
		course,
		free_drink,
		free_food,
		private_room,
		card,
		non_smoking,
		lunch,
		child,
		position,
	} = searchParams;

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;

		if (event.key === "Enter") {
			setSearchParams({ ...searchParams, keyword: value, position: undefined });
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
	};

	const values = [
		{ value: "private_room", label: "個室" },
		{ value: "course", label: "コース" },
		{ value: "child", label: "子連れ歓迎" },
		{ value: "lunch", label: "ランチ" },
		{ value: "_", label: "喫煙" },
		{ value: "non_smoking", label: "禁煙" },
		{ value: "card", label: "クレカ決済" },
		{ value: "free_drink", label: "食べ放題" },
		{ value: "free_food", label: "飲み放題" },
	];

	return (
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

				<div>
					<div className="grid grid-cols-3 gap-2 text-sm">
						{values.map(({ value, label }) => (
							<button
								key={value}
								type="button"
								className={clsx(
									"flex items-center justify-center h-10 border-[0.5px] border-gray-950 rounded-sm shadow-md",
									searchParams[value as keyof SearchParams]
										? "bg-gray-900 text-white"
										: "bg-white",
								)}
								onClick={() =>
									setSearchParams({
										...searchParams,
										[value]: !searchParams[value as keyof SearchParams],
									})
								}
							>
								{label}
							</button>
						))}
						{/* <button
							type="button"
							className={clsx(
								"flex items-center justify-center h-10 border-[0.5px] border-gray-950 rounded-sm shadow-md",
								private_room ? "bg-gray-900 text-white" : "bg-white",
							)}
						>
							個室
						</button>
						<button
							type="button"
							className={clsx(
								"flex items-center justify-center h-10 border-[0.5px] border-gray-950 rounded-sm shadow-md",
								course ? "bg-gray-900 text-white" : "bg-white",
							)}
						>
							コース
						</button>
						<button
							type="button"
							className={clsx(
								"flex items-center justify-center h-10 border-[0.5px] border-gray-950 rounded-sm shadow-md",
								child ? "bg-gray-900 text-white" : "bg-white",
							)}
						>
							子連れ歓迎
						</button>

						<button
							type="button"
							className={clsx(
								"flex items-center justify-center h-10 border-[0.5px] border-gray-950 rounded-sm shadow-md",
								lunch ? "bg-gray-900 text-white" : "bg-white",
							)}
						>
							ランチ
						</button>
						<button
							type="button"
							className={clsx(
								"flex items-center justify-center h-10 border-[0.5px] border-gray-950 rounded-sm shadow-md",
								// action ? "bg-gray-900 text-white" : "bg-white",
							)}
						>
							喫煙
						</button>
						<button
							type="button"
							className={clsx(
								"flex items-center justify-center h-10 border-[0.5px] border-gray-950 rounded-sm shadow-md",
								non_smoking ? "bg-gray-900 text-white" : "bg-white",
							)}
						>
							禁煙
						</button>

						<button
							type="button"
							className={clsx(
								"flex items-center justify-center h-10 border-[0.5px] border-gray-950 rounded-sm shadow-md",
								card ? "bg-gray-900 text-white" : "bg-white",
							)}
						>
							クレカ決済
						</button>
						<button
							type="button"
							className={clsx(
								"flex items-center justify-center h-10 border-[0.5px] border-gray-950 rounded-sm shadow-md",
								free_drink ? "bg-gray-900 text-white" : "bg-white",
							)}
						>
							食べ放題
						</button>
						<button
							type="button"
							className={clsx(
								"flex items-center justify-center h-10 border-[0.5px] border-gray-950 rounded-sm shadow-md",
								free_food ? "bg-gray-900 text-white" : "bg-white",
							)}
							onClick={() =>
								setSearchParams({
									...searchParams,
									free_food: !free_food,
								})
							}
						>
							飲み放題
						</button> */}
					</div>

					<button
						type="button"
						className={clsx(
							"flex items-center justify-center w-full h-10 mt-2 bg-white text-sm border-[0.5px] border-gray-950 rounded-sm shadow-md",
							position && "bg-gray-950 text-white",
						)}
						onClick={handleLocationButtonClick}
					>
						<MdLocationOn size={20} className="text-gray-300" />
						<span className="ml-1">現在地から探す</span>
					</button>
				</div>
			</div>
		</div>
	);
}
