import clsx from "clsx";
import { BsSearch } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";

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

				<div>
					<div className="grid grid-cols-3 gap-2 text-sm">
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							個室
						</div>
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							コース
						</div>
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							子連れ歓迎
						</div>

						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							ランチ
						</div>
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							喫煙
						</div>
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							禁煙
						</div>

						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							クレカ決済
						</div>
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							食べ放題
						</div>
						<div className="flex items-center justify-center h-10 bg-white border-[0.5px] border-gray-950 rounded-sm shadow-md">
							飲み放題
						</div>
					</div>

					<button
						type="button"
						className="flex items-center justify-center w-full h-10 mt-2 bg-white text-sm border-[0.5px] border-gray-950 rounded-sm shadow-md"
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
