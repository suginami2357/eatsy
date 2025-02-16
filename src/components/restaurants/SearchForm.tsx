import clsx from "clsx";
import { BsSearch } from "react-icons/bs";

type SearchFormProps = {
	/** 現在地の位置情報。位置が取得できない場合はundefinedになる。 */
	position: GeolocationPosition | undefined;
	/** 入力フィールドでキーボードのキーが押されたときに呼び出される関数 */
	handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	/** 現在地ボタンがクリックされたときに呼び出される関数 */
	handleLocationButtonClick: () => void;
	/** 検索ボタンがクリックされたときに呼び出される関数 */
	handleSearchButtonClick: () => void;
};

export default function SearchForm({
	position,
	handleKeyDown,
	handleLocationButtonClick,
	handleSearchButtonClick,
}: SearchFormProps) {
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

					<div className="grid grid-cols-3 gap-2 mt-8 text-sm">
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							子連れ歓迎
						</div>
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							コース
						</div>
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							個室
						</div>

						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							禁煙
						</div>
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							喫煙
						</div>
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							ランチ
						</div>

						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							クレカ決済
						</div>
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							飲み放題
						</div>
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							食べ放題
						</div>
					</div>

					<button
						type="button"
						className="fixed flex items-center justify-center z-10 bottom-9 left-20 w-40 h-10 bg-gray-950 text-white text-lg rounded-lg"
						onClick={handleSearchButtonClick}
					>
						<BsSearch size={12} />
						<span className="ml-2 text-sm">検索する</span>
					</button>
				</div>
			</div>
		</div>
	);
}
