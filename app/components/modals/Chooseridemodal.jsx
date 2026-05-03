'use client';

import { useState } from 'react';
import Modal from './Modal';

const RIDE_OPTIONS = [
	{
		id: 'executive',
		label: 'Executive saloon',
		seats: 5,
		price: 45,
		image: '/images/executive-saloon.png',
	},
	{ id: 'suv', label: 'SUV', seats: 4, price: 60, image: '/images/suv.png' },
	{
		id: 'electric',
		label: 'Electric car',
		seats: 4,
		price: 75,
		image: '/images/electric.png',
	},
];

export default function ChooseRideModal({ isOpen, onClose, onSelectRide }) {
	const [selected, setSelected] = useState(null);

	function handleSelect() {
		if (!selected) return;
		const ride = RIDE_OPTIONS.find((r) => r.id === selected);
		onSelectRide?.(ride);
		onClose();
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title='Choose a ride'>
			<div className='space-y-3 mb-6'>
				{RIDE_OPTIONS.map((ride) => (
					<button
						key={ride.id}
						onClick={() => setSelected(ride.id)}
						className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 text-left transition-colors ${
							selected === ride.id ?
								'border-neutral-900 bg-white'
							:	'border-neutral-100 hover:border-neutral-200 bg-white'
						}`}>
						<div className='w-16 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden'>
							{ride.image ?
								<img
									src={ride.image}
									alt={ride.label}
									className='w-full h-full object-contain'
								/>
							:	<svg
									className='w-8 h-8 text-neutral-400'
									fill='none'
									stroke='currentColor'
									strokeWidth={1.5}
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0'
									/>
								</svg>
							}
						</div>
						<div className='flex-1'>
							<span className='text-sm font-medium text-neutral-900'>
								{ride.label}
							</span>
							<span className='text-xs text-neutral-500 ml-2'>
								👤 {ride.seats}
							</span>
						</div>
						<span className='text-sm font-semibold text-neutral-900'>
							${ride.price}
						</span>
					</button>
				))}
			</div>

			<div className='flex justify-end'>
				<button
					onClick={handleSelect}
					className={`px-6 py-3 rounded-lg text-sm font-semibold transition-colors ${
						selected ?
							'bg-primary hover:bg-primary-hover text-white'
						:	'bg-neutral-200 text-neutral-400 cursor-not-allowed'
					}`}>
					Select ride
				</button>
			</div>
		</Modal>
	);
}
