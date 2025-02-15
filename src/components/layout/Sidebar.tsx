import clsx from "clsx";

type SidebarProps = {
	isOpen: boolean;
} & React.PropsWithChildren;

export default function Sidebar({ isOpen, children }: SidebarProps) {
	return (
		<div
			className={clsx(
				"flex fixed inset-0 w-full h-full z-20 transform transition-transform duration-300 ease-in-out",
				isOpen ? "translate-x-0" : "-translate-x-full",
			)}
		>
			{children}
		</div>
	);
}
