"use client";

import { getDetailsForUser } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

type FormState = {
	userName: string;
};

export default function UserForm() {
	const [state, formAction] = useFormState(getDetailsForUser, { error: "" });
	return (
		<form action={formAction}>
			<input
				type='text'
				name='userName'
				placeholder='Enter your username'
				className='text-gray-600'
			/>
			<Button />
			{state.error && <p>{state.error}</p>}
		</form>
	);
}

const Button = () => {
	const { pending } = useFormStatus();
	return <button type='submit'>{pending ? "Pending" : "Next"}</button>;
};
