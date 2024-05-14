export default function ItemsLoader() {
	const loadersArray = Array.from({ length: 4 }, (_, i) => i);
	return (
		<div className='my-5 space-y-5'>
			{loadersArray.map((_, index) => (
				<div
					key={index}
					className='w-full flex gap-4 items-center animate-pulse'
				>
					<div className='h-[50px] w-[50px] rounded-full bg-slate-700' />
					<div className='flex-1 h-6 rounded-md bg-slate-700' />
					<div className='ml-6 w-[92px] h-9 bg-slate-700 rounded-md' />
				</div>
			))}
		</div>
	);
}
