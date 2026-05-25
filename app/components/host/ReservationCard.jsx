import { MapPin, User } from 'lucide-react';
import { getStatusStyle } from '@/app/lib/data/reservations';

export default function ReservationCard({ reservation }) {
	const { title, location, id, checkIn, checkOut, guests, total, nights, status, image } =
		reservation;

	return (
		<div className='flex gap-4 border border-neutral-100 rounded-2xl p-4 hover:shadow-sm transition-shadow bg-white'>
			<div className='w-28 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100'>
				<img
					src={image}
					alt={title}
					className='w-full h-full object-cover'
				/>
			</div>

			<div className='flex-1 min-w-0'>
				<div className='flex items-start justify-between gap-2'>
					<div>
						<h3 className='text-sm font-semibold text-neutral-900'>{title}</h3>
						<p className='text-xs text-red-500 flex items-center gap-1 mt-0.5'>
							<MapPin size={12} fill='currentColor' strokeWidth={0} />
							{location}
						</p>
					</div>
					<span
						className={`text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 ${getStatusStyle(status)}`}>
						{status}
					</span>
				</div>

				<div className='grid grid-cols-4 gap-3 mt-3'>
					<MetaCell label='Booking ref' value={id} />
					<MetaCell label='Check-in' value={checkIn} />
					<MetaCell label='Check-out' value={checkOut} />
					<MetaCell
						label='Guests'
						value={
							<span className='flex items-center gap-1'>
								<User size={12} className='text-neutral-400' strokeWidth={1.5} />
								{guests}
							</span>
						}
					/>
				</div>

				<div className='mt-3'>
					<p className='text-xs text-neutral-400'>Total amount</p>
					<p className='text-sm font-bold text-neutral-900 mt-0.5'>${total}</p>
					<p className='text-xs text-neutral-400'>{nights} nights</p>
				</div>
			</div>
		</div>
	);
}

function MetaCell({ label, value }) {
	return (
		<div>
			<p className='text-xs text-neutral-400'>{label}</p>
			<p className='text-xs font-medium text-neutral-800 mt-0.5'>{value}</p>
		</div>
	);
}
