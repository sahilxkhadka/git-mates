import { redirectToHome } from "@/lib/actions";
import Link from "next/link";

export default function NotFound() {
	return (
		<form action={redirectToHome}>
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<button type='submit'>Back To Home</button>
		</form>
	);
}
