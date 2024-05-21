import Link from "next/link";

type Props = {
	link: string;
	mainText: string;
	hoverText: string;
	variant: "github" | "star";
};

export default function GithubButton({
	link,
	mainText,
	hoverText,
	variant,
}: Props) {
	return (
		<Link
			href={link}
			target='_blank'
			className='button-icon bg-githubGray flex border-2 w-fit h-fit cursor-pointer hover:border-green-400 group'
		>
			<div className='icon border-r bg-githubGray p-2.5 group-hover:border-green-400'>
				{variant === "star" ? (
					<svg
						viewBox='0 0 128 128'
						xmlns='http://www.w3.org/2000/svg'
						xmlnsXlink='http://www.w3.org/1999/xlink'
						aria-hidden='true'
						role='img'
						className='iconify iconify--noto size-6'
						preserveAspectRatio='xMidYMid meet'
						fill='#000000'
					>
						<g id='SVGRepo_bgCarrier' stroke-width='0'></g>
						<g
							id='SVGRepo_tracerCarrier'
							stroke-linecap='round'
							stroke-linejoin='round'
						></g>
						<g id='SVGRepo_iconCarrier'>
							<path
								d='M68.05 7.23l13.46 30.7a7.047 7.047 0 0 0 5.82 4.19l32.79 2.94c3.71.54 5.19 5.09 2.5 7.71l-24.7 20.75c-2 1.68-2.91 4.32-2.36 6.87l7.18 33.61c.63 3.69-3.24 6.51-6.56 4.76L67.56 102a7.033 7.033 0 0 0-7.12 0l-28.62 16.75c-3.31 1.74-7.19-1.07-6.56-4.76l7.18-33.61c.54-2.55-.36-5.19-2.36-6.87L5.37 52.78c-2.68-2.61-1.2-7.17 2.5-7.71l32.79-2.94a7.047 7.047 0 0 0 5.82-4.19l13.46-30.7c1.67-3.36 6.45-3.36 8.11-.01z'
								fill='#fdd835'
							></path>
							<path
								d='M67.07 39.77l-2.28-22.62c-.09-1.26-.35-3.42 1.67-3.42c1.6 0 2.47 3.33 2.47 3.33l6.84 18.16c2.58 6.91 1.52 9.28-.97 10.68c-2.86 1.6-7.08.35-7.73-6.13z'
								fill='#ffff8d'
							></path>
							<path
								d='M95.28 71.51L114.9 56.2c.97-.81 2.72-2.1 1.32-3.57c-1.11-1.16-4.11.51-4.11.51l-17.17 6.71c-5.12 1.77-8.52 4.39-8.82 7.69c-.39 4.4 3.56 7.79 9.16 3.97z'
								fill='#f4b400'
							></path>
						</g>
					</svg>
				) : (
					<svg viewBox='0 0 24 24' className='w-6 h-6'>
						<path
							d='M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z'
							fill='#c9d1d9'
						></path>
					</svg>
				)}
			</div>
			<div className='cube transition-all duration-300 w-44 h-5 text-githubGray-text'>
				<span className='side front uppercase'>{mainText}</span>
				<span className='side top text-white bg-green-400 bg-opacity-40'>
					{hoverText}
				</span>
			</div>
		</Link>
	);
}
