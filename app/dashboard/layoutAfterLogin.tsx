import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface ILayoutAfterLogin {
	children: ReactNode
}

export default function LayoutAfterLogin(props: ILayoutAfterLogin) {
	const {children} = props;
	return (
		<div>
			<Navbar />
			{children}
		</div>
	)
}