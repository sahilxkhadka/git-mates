"use client";

import { getDetailsForUser } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

type FormState = {
	userName: string;
};

async function action(prevState: FormState, data: FormData) {
	await new Promise((resolve) => setTimeout(resolve, 5000));
	const userName = data.get("userName");
	console.log(userName);
	return {
		userName: "Sahil",
	};
}

export default function UserForm() {
	const [state, formAction] = useFormState(getDetailsForUser, { userName: "" });
	return (
		<form action={formAction}>
			<input
				type='text'
				name='userName'
				placeholder='Enter your username'
				required
				className='text-gray-600'
			/>
			<Button />
		</form>
	);
}

const Button = () => {
	const { pending } = useFormStatus();
	return <button type='submit'>{pending ? "Pending" : "Next"}</button>;
};
