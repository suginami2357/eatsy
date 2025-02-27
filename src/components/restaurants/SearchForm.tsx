import clsx from "clsx";
import { BsSearch } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import type { GenreResponse, SearchParams } from "~/types/restaurant";
import { formatGenre } from "~/utils/restaurant";

type SearchFormProps = {
	fetch: GenreResponse;
	/**  */
	searchParams: SearchParams;
	/**  */
	setSearchParams: (params: SearchParams) => void;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	/** 入力フィールドでキーボードのキーが押されたときに呼び出される関数 */
	// handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	// /** 現在地ボタンがクリックされたときに呼び出される関数 */
	// handleLocationButtonClick: () => void;
};

export default function SearchForm({
	fetch,
	searchParams,
	setSearchParams,
	setIsModalOpen,
}: SearchFormProps) {
	const {
		keyword,
		genre,
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
		if (event.key !== "Enter") return;

		setSearchParams({ ...searchParams, keyword: value, position: undefined });
		setIsModalOpen(false);
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

	const genres = fetch.results.genre
		.filter((x) => !["G002", "G010", "G011", "G012", "G015"].includes(x.code))
		.reverse()
		.map((x) => formatGenre(x))
		.map((x) => ({ value: x.code, label: x.name }));

	const values = [
		// { value: "non_smoking", label: "禁煙" },
		// { value: "child", label: "子連れ歓迎" },
		// { value: "parking", label: "駐車場あり" },

		{ value: "card", label: "クレカ決済" },
		{ value: "private_room", label: "個室" },
		{ value: "course", label: "コース" },

		{ value: "lunch", label: "ランチ" },
		{ value: "free_food", label: "飲み放題" },
		{ value: "free_drink", label: "食べ放題" },
	];

	return (
		<div className="w-80 h-full bg-white shadow-lg">
			<div className="m-4 text-gray-900">
				{/* キーワード検索 */}
				<div className="flex items-center my-10 rounded-md shadow-xs">
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

				<div className="flex flex-col gap-y-4">
					<div className="grid grid-cols-3 gap-2 text-sm">
						{genres.map(({ value, label }) => (
							<button
								key={value}
								type="button"
								className={clsx(
									"flex items-center justify-center h-10 border-[0.5px] rounded-sm shadow-md",
									searchParams[value as keyof SearchParams]
										? "bg-gray-950 text-white border-white opacity-90"
										: "bg-white border-gray-950",
								)}
								onClick={() => {
									setSearchParams({
										...searchParams,
										genre: genre.includes(value)
											? genre.filter((x) => x !== value)
											: [...genre, value],
									});
								}}
							>
								{label}
							</button>
						))}
					</div>

					<div className="grid grid-cols-3 gap-2 text-sm">
						{values.map(({ value, label }) => (
							<button
								key={value}
								type="button"
								className={clsx(
									"flex items-center justify-center h-10 border-[0.5px] rounded-sm shadow-md",
									searchParams[value as keyof SearchParams]
										? "bg-gray-950 text-white border-white opacity-90"
										: "bg-white border-gray-950",
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
					</div>

					<button
						type="button"
						className={clsx(
							"flex items-center justify-center w-full h-10 _mt-2 text-sm border-[0.5px] rounded-sm shadow-md",
							position
								? "bg-gray-950 text-white border-white opacity-90"
								: "bg-white border-gray-950",
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
