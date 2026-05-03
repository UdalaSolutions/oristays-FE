'use client';

import { useState } from 'react';
import Modal from '../modals/Modal';

const TRAVELER_TYPES = ['Solo', 'Family'];
const TIERS = ['Any', 'Standard', 'Premium', 'Luxury'];
const BOOKING_OPTIONS = [
	'Instant book',
	'Free cancellation',
	'Allow pets',
	'Self check-in',
];
const AMENITIES = [
	'Wifi',
	'Air conditioning',
	'Kitchen',
	'Free parking',
	'Dedicated workspace',
];

function ToggleChip({ label, active, onToggle }) {
	return (
		<button
			onClick={onToggle}
			className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
				active ?
					'border-neutral-900 bg-white text-neutral-900'
				:	'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400'
			}`}>
			{label}
		</button>
	);
}

export default function FilterModal({ isOpen, onClose, onApply }) {
	const [travelerType, setTravelerType] = useState(null);
	const [tier, setTier] = useState('Any');
	const [bookingOptions, setBookingOptions] = useState([]);
	const [amenities, setAmenities] = useState([]);
	const [priceRange, setPriceRange] = useState([0, 500]);

	function toggleBookingOption(option) {
		setBookingOptions((prev) =>
			prev.includes(option) ?
				prev.filter((o) => o !== option)
			:	[...prev, option],
		);
	}

	function toggleAmenity(amenity) {
		setAmenities((prev) =>
			prev.includes(amenity) ?
				prev.filter((a) => a !== amenity)
			:	[...prev, amenity],
		);
	}

	function handleClear() {
		setTravelerType(null);
		setTier('Any');
		setBookingOptions([]);
		setAmenities([]);
		setPriceRange([0, 500]);
	}

	function handleApply() {
		onApply?.({ travelerType, tier, bookingOptions, amenities, priceRange });
		onClose();
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title='Filters'
			maxWidth='max-w-2xl'>
			<div className='space-y-8 max-h-[60vh] overflow-y-auto pr-1'>
				<section>
					<h3 className='text-base font-semibold text-neutral-900 mb-3'>
						Traveler type
					</h3>
					<div className='flex gap-2 flex-wrap'>
						{TRAVELER_TYPES.map((type) => (
							<ToggleChip
								key={type}
								label={type}
								active={travelerType === type}
								onToggle={() =>
									setTravelerType(travelerType === type ? null : type)
								}
							/>
						))}
					</div>
				</section>

				<section>
					<h3 className='text-base font-semibold text-neutral-900 mb-3'>
						Apartment tier
					</h3>
					<div className='flex gap-2 flex-wrap'>
						{TIERS.map((t) => (
							<ToggleChip
								key={t}
								label={t}
								active={tier === t}
								onToggle={() => setTier(t)}
							/>
						))}
					</div>
				</section>

				<section>
					<h3 className='text-base font-semibold text-neutral-900 mb-3'>
						Booking options
					</h3>
					<div className='flex gap-2 flex-wrap'>
						{BOOKING_OPTIONS.map((opt) => (
							<ToggleChip
								key={opt}
								label={opt}
								active={bookingOptions.includes(opt)}
								onToggle={() => toggleBookingOption(opt)}
							/>
						))}
					</div>
				</section>

				<section>
					<h3 className='text-base font-semibold text-neutral-900 mb-3'>
						Amenities
					</h3>
					<div className='flex gap-2 flex-wrap'>
						{AMENITIES.map((amenity) => (
							<ToggleChip
								key={amenity}
								label={amenity}
								active={amenities.includes(amenity)}
								onToggle={() => toggleAmenity(amenity)}
							/>
						))}
					</div>
					<button className='mt-3 text-sm text-neutral-600 underline hover:text-neutral-900'>
						Show more ↓
					</button>
				</section>

				<section>
					<h3 className='text-base font-semibold text-neutral-900 mb-1'>
						Price range
					</h3>
					<p className='text-xs text-neutral-500 mb-3'>
						✓ All-in pricing. No hidden fees.
					</p>
					<div className='flex items-center gap-3'>
						<div className='flex-1'>
							<input
								type='range'
								min={0}
								max={500}
								value={priceRange[0]}
								onChange={(e) =>
									setPriceRange([Number(e.target.value), priceRange[1]])
								}
								className='w-full accent-primary'
							/>
						</div>
						<div className='flex-1'>
							<input
								type='range'
								min={0}
								max={500}
								value={priceRange[1]}
								onChange={(e) =>
									setPriceRange([priceRange[0], Number(e.target.value)])
								}
								className='w-full accent-primary'
							/>
						</div>
					</div>
					<div className='flex justify-between text-xs text-neutral-500 mt-1'>
						<span>${priceRange[0]}</span>
						<span>${priceRange[1]}+</span>
					</div>
				</section>
			</div>

			<div className='flex items-center justify-between pt-5 mt-4 border-t border-neutral-200'>
				<button
					onClick={handleClear}
					className='text-sm font-medium text-neutral-700 underline hover:text-neutral-900'>
					Clear all
				</button>
				<button
					onClick={handleApply}
					className='bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors'>
					Apply filters
				</button>
			</div>
		</Modal>
	);
}
