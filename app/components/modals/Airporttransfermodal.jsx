'use client';

import { useState } from 'react';
import Modal from './Modal';

export default function AirportTransferModal({ isOpen, onClose, onSeePrices }) {
	const [flightNumber, setFlightNumber] = useState('');
	const [airport, setAirport] = useState('');

	const canSubmit = flightNumber.trim() && airport.trim();

	function handleSubmit() {
		if (!canSubmit) return;
		onSeePrices?.({ flightNumber, airport });
		onClose();
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title='Airport transfer'>
			<div className='space-y-4'>
				<div>
					<label className='block text-sm text-neutral-600 mb-1.5'>
						Arrival flight number
					</label>
					<input
						type='text'
						placeholder='e.g. BA 079'
						value={flightNumber}
						onChange={(e) => setFlightNumber(e.target.value)}
						className='w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
					/>
				</div>

				<div>
					<label className='block text-sm text-neutral-600 mb-1.5'>From</label>
					<input
						type='text'
						placeholder='Arrival airport'
						value={airport}
						onChange={(e) => setAirport(e.target.value)}
						className='w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
					/>
				</div>

				<div className='flex justify-end pt-2'>
					<button
						onClick={handleSubmit}
						className={`px-6 py-3 rounded-lg text-sm font-semibold transition-colors ${
							canSubmit ?
								'bg-primary hover:bg-primary-hover text-white'
							:	'bg-neutral-200 text-neutral-400 cursor-not-allowed'
						}`}>
						See prices
					</button>
				</div>
			</div>
		</Modal>
	);
}
