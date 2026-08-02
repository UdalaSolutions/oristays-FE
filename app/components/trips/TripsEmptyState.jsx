import Link from 'next/link';
import { Globe, Plane } from 'lucide-react';

function GlobeIllustration() {
	return (
		<div className='relative w-28 h-28 shrink-0 text-neutral-900'>
			<svg
				className='absolute inset-0 w-full h-full'
				viewBox='0 0 112 112'
				fill='none'>
				<ellipse
					cx='54'
					cy='58'
					rx='50'
					ry='28'
					transform='rotate(-24 54 58)'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeDasharray='2 6'
					strokeLinecap='round'
				/>
			</svg>
			<Globe
				className='absolute bottom-1 left-1 w-20 h-20'
				strokeWidth={1.4}
			/>
			<Plane
				className='absolute top-1 right-2 w-9 h-9 -rotate-[18deg]'
				strokeWidth={1.4}
				fill='white'
			/>
		</div>
	);
}

export default function TripsEmptyState() {
	return (
		<div className='flex flex-col md:flex-row items-center justify-center gap-8 py-24 md:py-32 text-center md:text-left'>
			<GlobeIllustration />
			<div className='max-w-md'>
				<h2 className='text-xl font-bold text-neutral-900 mb-2'>
					Ready for your next getaway?
				</h2>
				<p className='text-neutral-500 leading-relaxed mb-6'>
					Explore unique stays and book your next trip. Your bookings will appear
					here once confirmed
				</p>
				<Link
					href='/apartments'
					className='inline-block bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors'>
					Get started
				</Link>
			</div>
		</div>
	);
}
