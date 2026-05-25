'use client';

import {
	Wifi,
	Wind,
	UtensilsCrossed,
	Coffee,
	Car,
	Monitor,
	Thermometer,
	Dumbbell,
	Waves,
	Camera,
	HeartPulse,
	Flame,
	CircleCheck,
} from 'lucide-react';
import { AMENITIES, AMENITY_CATEGORIES } from '@/app/lib/data/listings';

const ICON_MAP = {
	Wifi,
	Wind,
	UtensilsCrossed,
	Coffee,
	Car,
	Monitor,
	Thermometer,
	Dumbbell,
	Waves,
	Camera,
	HeartPulse,
	Flame,
};

export default function StepAmenities({ selected, onToggle }) {
	return (
		<div className='max-w-lg'>
			<p className='text-xs font-medium text-neutral-500 mb-1'>Step 4/8</p>
			<h2 className='text-xl font-bold text-neutral-900 mb-8'>Amenities</h2>

			<div className='space-y-7'>
				{AMENITY_CATEGORIES.map((category) => {
					const items = AMENITIES.filter((a) => a.category === category);
					return (
						<div key={category}>
							<p className='text-sm text-neutral-400 mb-3'>{category}</p>
							<div className='flex flex-wrap gap-2'>
								{items.map((amenity) => {
									const Icon = ICON_MAP[amenity.icon];
									const isSelected = selected.includes(amenity.id);
									return (
										<AmenityPill
											key={amenity.id}
											label={amenity.label}
											icon={Icon}
											selected={isSelected}
											onToggle={() => onToggle(amenity.id)}
										/>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function AmenityPill({ label, icon: Icon, selected, onToggle }) {
	return (
		<button
			type='button'
			onClick={onToggle}
			className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm transition-all ${
				selected
					? 'border-neutral-800 text-neutral-900 bg-white'
					: 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
			}`}>
			{selected && (
				<CircleCheck size={15} strokeWidth={2} className='text-neutral-900 shrink-0' />
			)}
			{Icon && <Icon size={15} strokeWidth={1.5} className='shrink-0' />}
			{label}
		</button>
	);
}
