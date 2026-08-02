import Link from 'next/link';
import { getTripStatusStyle } from '@/app/lib/data/trips';

export default function TripCard({ trip }) {
	return (
		<Link
			href={`/trips/${trip.id}`}
			className='block rounded-2xl border border-neutral-200 bg-white p-3 shadow-card hover:shadow-md transition-shadow'>
			<div className='aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100'>
				<img
					src={trip.image}
					alt={trip.title}
					className='w-full h-full object-cover'
				/>
			</div>

			<div className='px-1 pt-4'>
				<h3 className='font-georgia text-base font-bold text-neutral-900'>
					{trip.title}
				</h3>
				<p className='text-sm text-neutral-500 mt-1'>{trip.guestsShort}</p>

				<div className='flex items-center justify-between border-t border-neutral-100 mt-4 pt-3'>
					<span className='text-sm text-neutral-800'>{trip.dateRange}</span>
					<span
						className={`text-xs font-semibold px-3 py-1 rounded-full ${getTripStatusStyle(trip.status)}`}>
						{trip.status}
					</span>
				</div>
			</div>
		</Link>
	);
}
