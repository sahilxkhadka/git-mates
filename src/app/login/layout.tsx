import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

export default function layout({ children }: Props) {
	return (
		<div>
			<p>Login</p>
			{children}
		</div>
	);
}
