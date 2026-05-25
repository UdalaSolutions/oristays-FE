'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import ChooseRideModal from '@/app/components/modals/Chooseridemodal';
import SpecialRequestModal from '@/app/components/modals/Specialrequestmodal';
import AirportTransferModal from '@/app/components/modals/Airporttransfermodal';

export default function CheckoutPage() {
	const router = useRouter();
	const [airportOpen, setAirportOpen] = useState(false);
	const [rideOpen, setRideOpen] = useState(false);
	const [specialOpen, setSpecialOpen] = useState(false);
	const [selectedRide, setSelectedRide] = useState(null);
	const [specialNote, setSpecialNote] = useState('');

	const pricePerNight = 70;
	const nights = 2;
	const subtotal = pricePerNight * nights;
	const fees = 20;
	const rideTotal = selectedRide ? selectedRide.price : 0;
	const total = subtotal + fees + rideTotal;
	const deposit = Math.round(total * 0.4);
	const balance = total - deposit;

	return (
		<>
			<Navbar />

			<main className='max-w-2xl mx-auto px-6 py-16'>
				<div className='flex items-center gap-4 mb-8'>
					<Link
						href='/apartments/modern-loft-apartment-0'
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
					<h1 className='text-black text-2xl font-bold leading-8'>
						Booking details
					</h1>
				</div>

				<div className='bg-white border border-neutral-200 shadow-[0px_0px_24px_1px_#A0C2DF33] rounded-2xl overflow-hidden'>
					<div className='p-5 border-b border-neutral-100'>
						<div className='flex items-center gap-4'>
							<div className='w-20 h-16 rounded-lg bg-neutral-200 overflow-hidden flex-shrink-0'>
								<img
									src='/images/apartment-placeholder.jpg'
									alt='Apartment'
									className='w-full h-full object-cover'
								/>
							</div>
							<div>
								<h2 className='text-sm font-semibold text-neutral-900'>
									Modern loft apartment
								</h2>
								<p className='text-xs text-neutral-500 mt-0.5'>
									Entire studio apartment in Lekki, Lagos
								</p>
								<div className='flex items-center gap-1 mt-1'>
									<svg
										className='w-3.5 h-3.5 text-yellow-400 fill-yellow-400'
										viewBox='0 0 20 20'>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>
									<span className='text-xs font-medium text-neutral-700'>
										4.5
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className='p-5 border-b border-neutral-100'>
						<h3 className='text-sm font-semibold text-neutral-900 mb-2'>
							Cancellation Policy
						</h3>
						<p className='text-sm text-neutral-600 leading-relaxed mb-2'>
							Cancel your booking free of charge up to 72 hours before check-in.
							After that, 50% cancellation fee applies.
						</p>
						<button className='text-sm text-neutral-900 underline'>
							Read policy
						</button>
					</div>

					<div className='p-5 border-b border-neutral-100 flex items-center justify-between'>
						<div>
							<p className='text-sm font-semibold text-neutral-900 mb-1'>
								Dates
							</p>
							<p className='text-sm text-neutral-600'>March 18 – 20</p>
						</div>
						<button className='text-sm font-medium bg-primary-light text-primary px-4 py-1.5 rounded-lg hover:bg-primary/10 transition-colors'>
							Edit
						</button>
					</div>

					<div className='p-5 border-b border-neutral-100 flex items-center justify-between'>
						<div>
							<p className='text-sm font-semibold text-neutral-900 mb-1'>
								Guests
							</p>
							<p className='text-sm text-neutral-600'>2 adults</p>
						</div>
						<button className='text-sm font-medium bg-primary-light text-primary px-4 py-1.5 rounded-lg hover:bg-primary/10 transition-colors'>
							Edit
						</button>
					</div>

					<div className='p-5 border-b border-neutral-100'>
						<p className='text-sm font-semibold text-neutral-900 mb-3'>Price</p>
						<div className='space-y-1.5 text-sm'>
							<div className='flex justify-between text-neutral-600'>
								<span>
									${pricePerNight} x {nights} nights
								</span>
								<span>${subtotal}</span>
							</div>
							<div className='flex justify-between text-neutral-600'>
								<span>Taxes and fees</span>
								<span>${fees}</span>
							</div>
						</div>
					</div>

					<div className='p-5 border-b border-neutral-100'>
						<button
							onClick={() =>
								selectedRide ? setRideOpen(true) : setAirportOpen(true)
							}
							className='w-full flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<svg
									className='w-4 h-4 text-neutral-500'
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
								<span className='text-sm font-medium text-neutral-900'>
									Airport transfer
								</span>
							</div>
							<svg
								className='w-4 h-4 text-neutral-400'
								fill='none'
								stroke='currentColor'
								strokeWidth={1.5}
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M8.25 4.5l7.5 7.5-7.5 7.5'
								/>
							</svg>
						</button>

						{selectedRide && (
							<div className='mt-3 flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200'>
								<div className='w-12 h-9 bg-neutral-200 rounded flex-shrink-0' />
								<div className='flex-1 text-sm font-medium text-neutral-900'>
									{selectedRide.label}{' '}
									<span className='text-neutral-500'>
										👤 {selectedRide.seats}
									</span>
								</div>
								<span className='text-sm font-semibold text-neutral-900'>
									${selectedRide.price}
								</span>
							</div>
						)}
					</div>

					<div className='p-5 border-b border-neutral-100'>
						<div className='flex items-center justify-between mb-1'>
							<div className='flex items-center gap-2'>
								<span className='text-sm font-semibold text-neutral-900'>
									Total
								</span>
								<span className='text-xs border border-neutral-200 px-2 py-0.5 rounded text-neutral-600'>
									USD ↓
								</span>
							</div>
							<span className='text-sm font-semibold text-neutral-900'>
								${total}
							</span>
						</div>
						<p className='text-xs text-neutral-500'>
							Pay ${deposit} today (40%). Balance of ${balance} due 48hrs before
							arrival.
						</p>
					</div>

					<div className='p-5 border-b border-neutral-100'>
						<button
							onClick={() => setSpecialOpen(true)}
							className='w-full flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<svg
									className='w-4 h-4 text-neutral-500'
									fill='none'
									stroke='currentColor'
									strokeWidth={1.5}
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
									/>
								</svg>
								<span className='text-sm font-medium text-neutral-900'>
									Special request
								</span>
							</div>
							<svg
								className='w-4 h-4 text-neutral-400'
								fill='none'
								stroke='currentColor'
								strokeWidth={1.5}
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M8.25 4.5l7.5 7.5-7.5 7.5'
								/>
							</svg>
						</button>
						{specialNote && (
							<p className='mt-2 text-xs text-neutral-500'>{specialNote}</p>
						)}
					</div>

					<div className='p-5'>
						<Link
							href='/checkout/add-ride'
							className='w-full block text-center bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-xl text-sm transition-colors'>
							Confirm and pay
						</Link>
					</div>
				</div>
			</main>

			<Footer />

			<AirportTransferModal
				isOpen={airportOpen}
				onClose={() => setAirportOpen(false)}
				onSeePrices={() => {
					setAirportOpen(false);
					setRideOpen(true);
				}}
			/>
			<ChooseRideModal
				isOpen={rideOpen}
				onClose={() => setRideOpen(false)}
				onSelectRide={(ride) => setSelectedRide(ride)}
			/>
			<SpecialRequestModal
				isOpen={specialOpen}
				onClose={() => setSpecialOpen(false)}
				onAddNote={(note) => setSpecialNote(note)}
			/>
		</>
	);
}
