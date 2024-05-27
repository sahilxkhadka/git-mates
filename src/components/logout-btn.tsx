import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";

export default function LogoutBtn() {
	async function handleLogout(formData: FormData) {
		"use server";
		cookies().delete("refresh_token");
		console.log("logout garyo");
		redirect("/");
	}

	return (
		<form action={handleLogout}>
			<button type='submit'>LogoutBtn</button>
		</form>
	);
}
