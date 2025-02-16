import clsx from "clsx";
import dynamic from "next/dynamic";

type SidebarProps = {
	isMobile: boolean;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & React.PropsWithChildren;

function Sidebar({ isMobile, isOpen, setIsOpen, children }: SidebarProps) {
	return (
		<div
			className={clsx(
				"flex fixed inset-0 z-20 transform transition-transform duration-300 ease-in-out",
				isOpen ? "translate-x-0" : "-translate-x-full",
			)}
		>
			{/* オーバーレイ */}
			{isMobile && (
				<button
					className={clsx(
						"flex fixed inset-0 bg-black bg-opacity-50 transition-opacity",
						isOpen ? "opacity-100 delay-[150ms]" : "opacity-0",
					)}
					onClick={() => setIsOpen(false)}
					type="button"
				/>
			)}

			{/* サイドバー */}
			<div className="flex z-30 w-80 h-full bg-white shadow-lg">
				<div className="text-gray-900">{children}</div>
			</div>
		</div>
	);
}

export default dynamic(() => Promise.resolve(Sidebar), { ssr: false });
