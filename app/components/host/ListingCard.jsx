import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function ListingCard({ listing }) {
	const { id, title, location, image } = listing;

	return (
		<div>
			<Link href={`/host/dashboard/listings/${id}`}>
				<div className='aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 mb-3'>
					<img
						src={image}
						alt={title}
						className='w-full h-full object-cover'
					/>
				</div>
			</Link>

			<h3 className='text-base font-bold text-neutral-900'>{title}</h3>

			<p className='text-sm text-red-500 flex items-center gap-1 mt-1'>
				<MapPin size={14} fill='currentColor' strokeWidth={0} />
				{location}
			</p>

			<div className='flex gap-2 mt-4'>
				<Link
					href={`/host/dashboard/listings/${id}`}
					className='flex-1 text-center text-sm font-semibold text-primary py-2.5 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-colors'>
					Edit
				</Link>
				<Link
					href={`/host/dashboard/listings/${id}/calendar`}
					className='flex-1 text-center text-sm font-semibold text-primary bg-primary-light py-2.5 rounded-xl hover:bg-primary/10 transition-colors'>
					Calendar
				</Link>
			</div>
		</div>
	);
}
