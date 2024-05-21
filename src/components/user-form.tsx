"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type FormState = {
	userName: string;
};

export default function UserForm() {
	const searchParams = useSearchParams();
	const paramsName = searchParams.get("userName") || "";

	console.log(paramsName);

	const router = useRouter();

	const [userName, setUserName] = useState(paramsName);

	useEffect(() => {
		setUserName(paramsName);
	}, [paramsName]);

	return (
		<div>
			<div className='flex items-end flex-wrap justify-center gap-3'>
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
						value={userName}
						onChange={(e) => {
							setUserName(e.target.value);
							if (!e.target.value) {
								router.replace("/");
							}
						}}
						onKeyDown={(e) => {
							console.log(e.key);
							if (e.key === "Enter") {
								router.replace(`/overview?userName=${userName}`);
							}
						}}
					/>
				</div>
				<Link
					href={
						userName
							? {
									pathname: "/overview",
									query: { userName: userName },
							  }
							: {}
					}
					className='bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group'
				>
					<span className='bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]'></span>
					Get Results
				</Link>
			</div>
		</div>
	);
}
