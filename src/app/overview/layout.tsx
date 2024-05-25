import UserForm from "@/components/user-form";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='flex h-screen flex-col items-center gap-4 p-4 sm:p-8'>
			<Suspense>
				<UserForm />
			</Suspense>
			{children}
		</main>
	);
}