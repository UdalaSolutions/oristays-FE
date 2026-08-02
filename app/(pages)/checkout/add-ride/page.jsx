'use client';

// ⚠️ TEMPORARILY OUT OF FLOW — Airport pickup / car ride step.
// Cars are not available yet (may return next year). This page is no longer linked
// from checkout (Booking details "Confirm and pay" now goes straight to
// /booking-confirmed). Kept intact so the car ride flow can be restored later.

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BookingStepIndicator from '@/app/components/checkout/Bookingstepindicator';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';

const RIDE_OPTIONS = [
	{ id: 'executive', label: 'Executive saloon', seats: 5, price: 45 },
	{ id: 'suv', label: 'SUV', seats: 4, price: 60 },
	{ id: 'electric', label: 'Electric car', seats: 4, price: 75 },
];

export default function AddRidePage() {
	const router = useRouter();
	const [choice, setChoice] = useState(null);
	const [flightNumber, setFlightNumber] = useState('');
	const [terminal, setTerminal] = useState('');
	const [selectedRide, setSelectedRide] = useState(null);

	const canContinue =
		choice === 'own' ||
		(choice === 'airport' && flightNumber && terminal && selectedRide);

	return (
		<>
			<Navbar />

			<main className='max-w-2xl mx-auto px-6 py-8'>
				<div className='flex items-center gap-4 mb-8'>
					<Link
						href='/checkout'
						className='flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900'>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							strokeWidth={1.5}
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
							/>
						</svg>
						Back
					</Link>
					<h1 className='text-xl font-semibold text-neutral-900'>
						Add airport pickup
					</h1>
				</div>

				<BookingStepIndicator currentStep={2} />

				<div className='bg-white border border-neutral-200 rounded-2xl overflow-hidden'>
					<button
						onClick={() => setChoice(choice === 'airport' ? null : 'airport')}
						className={`w-full flex items-start gap-4 p-5 border-b border-neutral-100 text-left transition-colors ${
							choice === 'airport' ? 'bg-neutral-50' : 'hover:bg-neutral-50'
						}`}>
						<div
							className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
								choice === 'airport' ?
									'border-neutral-900 bg-neutral-900'
								:	'border-neutral-300'
							}`}>
							{choice === 'airport' && (
								<div className='w-2 h-2 rounded-full bg-white' />
							)}
						</div>
						<div>
							<p className='text-sm font-semibold text-neutral-900'>
								Airport pickup
							</p>
							<p className='text-xs text-neutral-500 mt-0.5'>
								Book ride for easy pickup at airport
							</p>
						</div>
					</button>

					{choice === 'airport' && (
						<div className='p-5 border-b border-neutral-100 space-y-4'>
							<div>
								<label className='block text-sm text-neutral-700 mb-1.5'>
									Flight number
								</label>
								<input
									type='text'
									placeholder='e.g BA 079'
									value={flightNumber}
									onChange={(e) => setFlightNumber(e.target.value)}
									className='w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
								/>
								<p className='text-xs text-neutral-400 mt-1.5'>
									We track this for delays to update driver automatically.
								</p>
							</div>

							<div>
								<label className='block text-sm text-neutral-700 mb-1.5'>
									Terminal number
								</label>
								<input
									type='text'
									placeholder='e.g BA 079'
									value={terminal}
									onChange={(e) => setTerminal(e.target.value)}
									className='w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
								/>
							</div>

							<div>
								<label className='block text-sm text-neutral-700 mb-3'>
									Choose a ride
								</label>
								<div className='space-y-2'>
									{RIDE_OPTIONS.map((ride) => (
										<button
											key={ride.id}
											onClick={() => setSelectedRide(ride.id)}
											className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 text-left transition-colors ${
												selectedRide === ride.id ?
													'border-neutral-900'
												:	'border-neutral-100 hover:border-neutral-200'
											}`}>
											<div className='w-14 h-10 bg-neutral-100 rounded-lg flex-shrink-0' />
											<div className='flex-1 text-sm font-medium text-neutral-900'>
												{ride.label}{' '}
												<span className='text-neutral-500 text-xs'>
													👤 {ride.seats}
												</span>
											</div>
											<span className='text-sm font-semibold text-neutral-900'>
												${ride.price}
											</span>
										</button>
									))}
								</div>
							</div>
						</div>
					)}

					<button
						onClick={() => setChoice(choice === 'own' ? null : 'own')}
						className={`w-full flex items-start gap-4 p-5 text-left transition-colors ${
							choice === 'own' ? 'bg-neutral-50' : 'hover:bg-neutral-50'
						}`}>
						<div
							className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
								choice === 'own' ?
									'border-neutral-900 bg-neutral-900'
								:	'border-neutral-300'
							}`}>
							{choice === 'own' && (
								<div className='w-2 h-2 rounded-full bg-white' />
							)}
						</div>
						<p className='text-sm font-semibold text-neutral-900'>
							I&apos;ll arrange my own transport
						</p>
					</button>

					<div className='p-5 border-t border-neutral-100'>
						<button
							onClick={() => canContinue && router.push('/checkout/review')}
							className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-colors ${
								canContinue ?
									'bg-primary hover:bg-primary-hover text-white'
								:	'bg-neutral-100 text-neutral-400 cursor-not-allowed'
							}`}>
							Continue
						</button>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
}
