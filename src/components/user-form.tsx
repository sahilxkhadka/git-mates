"use client";

import { getDetailsForUser } from "@/lib/actions";
import { RedirectType, redirect, useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

type FormState = {
	userName: string;
};

export default function UserForm() {
	const searchParams = useSearchParams();
	const userName = searchParams.get("userName") || "";
	const [state, formAction] = useFormState(getDetailsForUser, { error: "" });

	if (state.error) redirect("/");

	return (
		<form action={formAction}>
			<div className='flex items-end gap-3'>
				<div className='input flex flex-col w-fit'>
					<label
						htmlFor='userName'
						className='text-blue-500 dark:bg-black text-xs font-semibold relative top-2 ml-[7px] px-[3px]  w-fit'
					>
						UserName:
					</label>
					<input
						type='text'
						placeholder='Enter your username'
						name='userName'
						className='border-blue-500 input px-[10px] py-[11px] text-xs border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-white bg-transparent'
						defaultValue={userName}
					/>
				</div>
				<Button />
			</div>
			{state.error && <p>{state.error}</p>}
		</form>
	);
}

const Button = () => {
	const { pending } = useFormStatus();
	return (
		<button className='bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group'>
			<span className='bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]'></span>
			Get Results
		</button>
	);
};
