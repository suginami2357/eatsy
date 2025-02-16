import clsx from "clsx";

type SidebarProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & React.PropsWithChildren;

export default function Sidebar({ isOpen, setIsOpen, children }: SidebarProps) {
	return (
		<div
			className={clsx(
				"flex fixed inset-0 z-20 transform transition-transform duration-300 ease-in-out",
				isOpen ? "translate-x-0" : "-translate-x-full",
			)}
		>
			{/* オーバーレイ */}
			{
				<button
					className={clsx(
						"flex fixed inset-0 bg-black bg-opacity-50 transition-opacity",
						isOpen ? "opacity-100 delay-[200ms]" : "opacity-0",
					)}
					onClick={() => setIsOpen(false)}
					type="button"
				/>
			}

			{/* サイドバー */}
			<div className="flex z-30 w-80 h-full bg-white shadow-lg">
				<div className="text-gray-900">{children}</div>
			</div>
		</div>
	);
}
