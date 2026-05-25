import { MapPin } from 'lucide-react';

export default function ListingCard({ listing, onEdit, onCalendar }) {
	const { title, location, image } = listing;

	return (
		<div>
			<div className='aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 mb-3'>
				<img
					src={image}
					alt={title}
					className='w-full h-full object-cover'
				/>
			</div>

			<h3 className='text-base font-bold text-neutral-900'>{title}</h3>

			<p className='text-sm text-red-500 flex items-center gap-1 mt-1'>
				<MapPin size={14} fill='currentColor' strokeWidth={0} />
				{location}
			</p>

			<div className='flex gap-2 mt-4'>
				<button
					onClick={onEdit}
					className='flex-1 text-sm font-semibold text-primary py-2.5 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-colors'>
					Edit
				</button>
				<button
					onClick={onCalendar}
					className='flex-1 text-sm font-semibold text-primary bg-primary-light py-2.5 rounded-xl hover:bg-primary/10 transition-colors'>
					Calendar
				</button>
			</div>
		</div>
	);
}
