'use client';

import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const GUEST_OPTIONS = [
	'1 adult',
	'2 adults',
	'3 adults',
	'4 adults',
	'2 adults, 1 child',
	'2 adults, 2 children',
];

export default function ChangeReservationDrawer({ trip, onClose }) {
	const initialGuests = '2 adults';
	const [checkIn, setCheckIn] = useState('Mar 18');
	const [checkOut, setCheckOut] = useState('Mar 20');
	const [guests, setGuests] = useState(initialGuests);

	const firstName = trip.host.name.split(' ')[0];
	const changed = guests !== initialGuests || checkIn !== 'Mar 18' || checkOut !== 'Mar 20';

	return (
		<div className='fixed inset-0 z-50 flex'>
			<div
				className='flex-1 bg-black/30 backdrop-blur-sm'
				onClick={onClose}
			/>

			<div className='w-full max-w-[560px] bg-white h-full flex flex-col shadow-2xl'>
				<div className='flex-1 overflow-y-auto no-scrollbar px-8 pt-6 pb-8'>
					<button
						onClick={onClose}
						aria-label='Close'
						className='text-neutral-500 hover:text-neutral-900 transition-colors mb-6'>
						<X size={22} strokeWidth={1.5} />
					</button>

					<h2 className='font-georgia text-2xl font-bold text-neutral-900 mb-2'>
						What would you like to change?
					</h2>
					<p className='text-sm text-neutral-500 leading-relaxed mb-8'>
						Update any details and send a request to your host,{' '}
						<span className='text-neutral-700 font-medium'>{firstName}</span>, to review and
						confirm.
					</p>

					{/* Apartment */}
					<div className='flex items-center gap-4 mb-8'>
						<div className='w-20 h-20 rounded-2xl overflow-hidden bg-neutral-100 shrink-0'>
							<img
								src={trip.image}
								alt={trip.title}
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='min-w-0'>
							<p className='text-base font-bold text-neutral-900'>{trip.title}</p>
							<p className='text-sm text-neutral-500 mt-0.5'>{trip.subtitle}</p>
							<p className='text-sm text-neutral-400 mt-0.5'>{trip.specs}</p>
						</div>
					</div>

					{/* Dates */}
					<p className='text-base font-bold text-neutral-900 mb-3'>Dates</p>
					<div className='flex border border-neutral-200 rounded-2xl overflow-hidden mb-8'>
						<div className='flex-1 px-5 py-3.5'>
							<p className='text-xs text-neutral-400 uppercase tracking-wide mb-1.5'>
								Check-in
							</p>
							<input
								type='text'
								value={checkIn}
								onChange={(e) => setCheckIn(e.target.value)}
								className='w-full text-sm font-semibold text-neutral-900 bg-transparent focus:outline-none'
							/>
						</div>
						<div className='w-px bg-neutral-200' />
						<div className='flex-1 px-5 py-3.5'>
							<p className='text-xs text-neutral-400 uppercase tracking-wide mb-1.5'>
								Checkout
							</p>
							<input
								type='text'
								value={checkOut}
								onChange={(e) => setCheckOut(e.target.value)}
								className='w-full text-sm font-semibold text-neutral-900 bg-transparent focus:outline-none'
							/>
						</div>
					</div>

					{/* Guests */}
					<p className='text-base font-bold text-neutral-900 mb-3'>Guests</p>
					<div className='relative mb-8'>
						<select
							value={guests}
							onChange={(e) => setGuests(e.target.value)}
							className='w-full appearance-none border border-neutral-200 rounded-2xl px-5 py-4 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary bg-white pr-10 cursor-pointer'>
							{GUEST_OPTIONS.map((opt) => (
								<option key={opt}>{opt}</option>
							))}
						</select>
						<ChevronDown
							size={18}
							strokeWidth={1.5}
							className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none'
						/>
					</div>

					{/* Cancellation policy */}
					<p className='text-base font-bold text-neutral-900 mb-2'>Cancellation Policy</p>
					<p className='text-sm text-neutral-500 leading-relaxed mb-2'>
						{trip.cancellationPolicy}
					</p>
					<button className='text-sm font-semibold text-neutral-900 underline'>
						Read policy
					</button>
				</div>

				<div className='px-8 py-5 border-t border-neutral-100 flex justify-end'>
					<button
						onClick={onClose}
						disabled={!changed}
						className={`px-8 py-3 text-sm font-semibold rounded-xl transition-colors ${
							changed
								? 'bg-primary hover:bg-primary-hover text-white'
								: 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
						}`}>
						Send request
					</button>
				</div>
			</div>
		</div>
	);
}
