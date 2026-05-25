'use client';

import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import SelectApartmentModal from './SelectApartmentModal';

const GUEST_OPTIONS = [
	'1 adult',
	'2 adults',
	'3 adults',
	'4 adults',
	'2 adults, 1 child',
	'2 adults, 2 children',
];

export default function ChangeReservationModal({ reservation, onClose }) {
	const [checkIn, setCheckIn] = useState(reservation.checkIn);
	const [checkOut, setCheckOut] = useState(reservation.checkOut);
	const [guests, setGuests] = useState(reservation.guestLabel);
	const [selectedTitle, setSelectedTitle] = useState(reservation.title);
	const [showSelectApartment, setShowSelectApartment] = useState(false);

	const amount = reservation.pricePerNight * reservation.nights;
	const guestFirstName = reservation.booker.split(' ')[0];

	return (
		<>
			<div className='fixed inset-0 z-40 flex'>
				<div
					className='flex-1 bg-black/40 backdrop-blur-sm'
					onClick={onClose}
				/>

				<div className='w-[500px] bg-white h-full flex flex-col shadow-2xl'>
					<div className='flex-1 overflow-y-auto px-8 py-8'>
						<button
							onClick={onClose}
							className='text-neutral-400 hover:text-neutral-700 transition-colors mb-6 block'>
							<X size={20} strokeWidth={1.5} />
						</button>

						<h2 className='text-xl font-bold text-neutral-900 mb-2'>
							What would you like to change?
						</h2>
						<p className='text-sm text-neutral-500 leading-relaxed mb-8'>
							Update any details and send a request to your guest,{' '}
							<span className='font-medium text-neutral-700'>{guestFirstName}</span>, to
							review and confirm.
						</p>

						<div className='flex items-start gap-4 pb-8 border-b border-neutral-100 mb-8'>
							<div className='w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-100'>
								<img
									src={reservation.image}
									alt={selectedTitle}
									className='w-full h-full object-cover'
								/>
							</div>
							<div className='flex-1 min-w-0'>
								<p className='text-sm font-bold text-neutral-900'>{selectedTitle}</p>
								<p className='text-xs text-neutral-500 mt-1'>{reservation.subtitle}</p>
								<p className='text-xs text-neutral-400 mt-0.5'>{reservation.specs}</p>
							</div>
							<button
								onClick={() => setShowSelectApartment(true)}
								className='text-xs font-semibold text-primary border border-primary px-3 py-1.5 rounded-lg shrink-0 hover:bg-primary-light transition-colors'>
								Edit
							</button>
						</div>

						<div className='mb-8'>
							<p className='text-sm font-bold text-neutral-900 mb-3'>Dates</p>
							<div className='flex gap-3'>
								<div className='flex-1 border border-neutral-200 rounded-xl px-4 py-3'>
									<p className='text-xs text-neutral-400 uppercase tracking-wide mb-1.5'>
										Check-in
									</p>
									<input
										type='text'
										value={checkIn}
										onChange={(e) => setCheckIn(e.target.value)}
										className='w-full text-sm font-medium text-neutral-900 bg-transparent focus:outline-none'
									/>
								</div>
								<div className='flex-1 border border-neutral-200 rounded-xl px-4 py-3'>
									<p className='text-xs text-neutral-400 uppercase tracking-wide mb-1.5'>
										Checkout
									</p>
									<input
										type='text'
										value={checkOut}
										onChange={(e) => setCheckOut(e.target.value)}
										className='w-full text-sm font-medium text-neutral-900 bg-transparent focus:outline-none'
									/>
								</div>
							</div>
						</div>

						<div className='mb-8'>
							<p className='text-sm font-bold text-neutral-900 mb-3'>Guests</p>
							<div className='relative'>
								<select
									value={guests}
									onChange={(e) => setGuests(e.target.value)}
									className='w-full appearance-none border border-neutral-200 rounded-xl px-4 py-3.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary bg-white pr-10 cursor-pointer'>
									{GUEST_OPTIONS.map((opt) => (
										<option key={opt}>{opt}</option>
									))}
								</select>
								<ChevronDown
									size={16}
									strokeWidth={1.5}
									className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none'
								/>
							</div>
						</div>

						<div>
							<p className='text-sm font-bold text-neutral-900 mb-3'>Amount</p>
							<div className='flex items-center justify-between'>
								<p className='text-sm text-neutral-500'>
									${reservation.pricePerNight} x {reservation.nights} nights
								</p>
								<p className='text-sm font-bold text-neutral-900'>${amount}</p>
							</div>
						</div>
					</div>

					<div className='px-8 py-5 border-t border-neutral-100 flex justify-end'>
						<button
							onClick={onClose}
							className='px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold text-sm rounded-xl transition-colors'>
							Send request
						</button>
					</div>
				</div>
			</div>

			{showSelectApartment && (
				<SelectApartmentModal
					onClose={() => setShowSelectApartment(false)}
					onSelect={(apt) => {
						setSelectedTitle(apt.name);
						setShowSelectApartment(false);
					}}
				/>
			)}
		</>
	);
}
