import RadioCard from '@/app/components/host/RadioCard';
import { BOOKING_OPTIONS } from '@/app/lib/data/listings';

export default function StepBookingSettings({ selected, onSelect }) {
	return (
		<div className='max-w-lg'>
			<p className='text-xs font-medium text-neutral-500 mb-1'>Step 6/8</p>
			<h2 className='text-xl font-bold text-neutral-900 mb-8'>Booking settings</h2>

			<div className='space-y-3'>
				{BOOKING_OPTIONS.map((opt) => (
					<RadioCard
						key={opt.value}
						option={opt}
						selected={selected}
						onSelect={onSelect}
					/>
				))}
			</div>
		</div>
	);
}
