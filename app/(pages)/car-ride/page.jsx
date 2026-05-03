'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/layout/Navbar';
import { HowItWorks } from '@/app/components/home/HowItWorks';
import { FAQSection } from '@/app/components/home/FAQSection';
import Footer from '@/app/components/layout/Footer';

const RIDE_TYPES = [
	'Half day hire (4hrs)',
	'Full day hire (8hrs)',
	'Point to point',
	'Airport transfer',
];

function CarRideForm() {
	const [tab, setTab] = useState('car');
	const [rideType, setRideType] = useState('');
	const [pickupAddress, setPickupAddress] = useState('');
	const [pickupTime, setPickupTime] = useState('now');
	const [airportMode, setAirportMode] = useState('pickup');
	const [flightNumber, setFlightNumber] = useState('');
	const [arrivalAirport, setArrivalAirport] = useState('');
	const [dropoffAddress, setDropoffAddress] = useState('');

	const canSubmit =
		tab === 'car' ? rideType && pickupAddress : flightNumber && arrivalAirport;

	return (
		<div className='bg-white rounded-2xl border border-primary/30 p-5 w-full max-w-sm'>
			<div className='flex rounded-xl bg-primary-light p-1 mb-5'>
				{['car', 'airport'].map((t) => (
					<button
						key={t}
						onClick={() => setTab(t)}
						className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
							tab === t ?
								'bg-white text-neutral-900 shadow-sm'
							:	'text-neutral-600 hover:text-neutral-900'
						}`}>
						{t === 'car' ? 'Car ride' : 'Airport transfers'}
					</button>
				))}
			</div>

			{tab === 'car' ?
				<div className='space-y-0 divide-y divide-neutral-100'>
					<div className='flex items-center gap-3 py-3'>
						<svg
							className='w-4 h-4 text-neutral-400 flex-shrink-0'
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
						<select
							value={rideType}
							onChange={(e) => setRideType(e.target.value)}
							className='flex-1 bg-transparent text-sm text-neutral-600 focus:outline-none appearance-none'>
							<option value=''>Ride type</option>
							{RIDE_TYPES.map((r) => (
								<option
									key={r}
									value={r}>
									{r}
								</option>
							))}
						</select>
						<svg
							className='w-4 h-4 text-neutral-400'
							fill='none'
							stroke='currentColor'
							strokeWidth={1.5}
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M19 9l-7 7-7-7'
							/>
						</svg>
					</div>

					<div className='flex items-center gap-3 py-3'>
						<svg
							className='w-4 h-4 text-neutral-400 flex-shrink-0'
							fill='none'
							stroke='currentColor'
							strokeWidth={1.5}
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
							/>
						</svg>
						<input
							type='text'
							placeholder='Pick up address'
							value={pickupAddress}
							onChange={(e) => setPickupAddress(e.target.value)}
							className='flex-1 bg-transparent text-sm text-neutral-600 placeholder:text-neutral-400 focus:outline-none'
						/>
					</div>

					<div className='flex items-center gap-3 py-3'>
						<svg
							className='w-4 h-4 text-neutral-400 flex-shrink-0'
							fill='none'
							stroke='currentColor'
							strokeWidth={1.5}
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
						<select
							value={pickupTime}
							onChange={(e) => setPickupTime(e.target.value)}
							className='flex-1 bg-transparent text-sm text-neutral-600 focus:outline-none appearance-none'>
							<option value='now'>Pick up now</option>
							<option value='scheduled'>Schedule for later</option>
						</select>
						<svg
							className='w-4 h-4 text-neutral-400'
							fill='none'
							stroke='currentColor'
							strokeWidth={1.5}
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M19 9l-7 7-7-7'
							/>
						</svg>
					</div>
				</div>
			:	<div className='space-y-3'>
					<div className='flex gap-4'>
						{['pickup', 'dropoff'].map((mode) => (
							<label
								key={mode}
								className='flex items-center gap-2 cursor-pointer'>
								<input
									type='radio'
									name='airportMode'
									value={mode}
									checked={airportMode === mode}
									onChange={() => setAirportMode(mode)}
									className='accent-neutral-900'
								/>
								<span className='text-sm text-neutral-700'>
									{mode === 'pickup' ? 'Airport pick-up' : 'Airport drop-off'}
								</span>
							</label>
						))}
					</div>

					<div className='space-y-0 divide-y divide-neutral-100'>
						<div className='flex items-center gap-3 py-3'>
							<svg
								className='w-4 h-4 text-neutral-400 flex-shrink-0'
								fill='none'
								stroke='currentColor'
								strokeWidth={1.5}
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
								/>
							</svg>
							<input
								type='text'
								placeholder='Arrival flight number'
								value={flightNumber}
								onChange={(e) => setFlightNumber(e.target.value)}
								className='flex-1 bg-transparent text-sm text-neutral-600 placeholder:text-neutral-400 focus:outline-none'
							/>
						</div>
						<div className='flex items-center gap-3 py-3'>
							<svg
								className='w-4 h-4 text-neutral-400 flex-shrink-0'
								fill='none'
								stroke='currentColor'
								strokeWidth={1.5}
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
								/>
							</svg>
							<input
								type='text'
								placeholder='Arrival airport'
								value={arrivalAirport}
								onChange={(e) => setArrivalAirport(e.target.value)}
								className='flex-1 bg-transparent text-sm text-neutral-600 placeholder:text-neutral-400 focus:outline-none'
							/>
						</div>
						<div className='flex items-center gap-3 py-3'>
							<svg
								className='w-4 h-4 text-neutral-400 flex-shrink-0'
								fill='none'
								stroke='currentColor'
								strokeWidth={1.5}
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z'
								/>
							</svg>
							<input
								type='text'
								placeholder='Drop off address'
								value={dropoffAddress}
								onChange={(e) => setDropoffAddress(e.target.value)}
								className='flex-1 bg-transparent text-sm text-neutral-600 placeholder:text-neutral-400 focus:outline-none'
							/>
						</div>
					</div>
				</div>
			}

			<Link
				href='/car-ride/book'
				className={`mt-5 w-full py-3 rounded-xl text-sm font-semibold text-center block transition-colors ${
					canSubmit ?
						'bg-primary hover:bg-primary-hover text-white'
					:	'bg-neutral-100 text-neutral-400 cursor-not-allowed pointer-events-none'
				}`}>
				See prices
			</Link>
		</div>
	);
}

export default function CarRidePage() {
	return (
		<>
			<Navbar />

			<main>
				<section className='relative min-h-153 flex flex-col justify-center overflow-hidden'>
					<div className='absolute inset-0'>
						<img
							src='/images/car-ride-hero.svg'
							alt='Car ride Lagos'
							className='w-full h-full object-cover'
						/>
						<div className='absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent' />
					</div>

					<div className='relative z-10 max-w-335 mx-auto px-6 py-16 w-full flex flex-col md:flex-row items-start md:items-center gap-10'>
						<div className='flex-1'>
							<span className='inline-block bg-primary/30 text-[#EB997A] text-sm  px-3 py-1.5 rounded-full mb-6 border border-primary'>
								Lagos, Nigeria 2026
							</span>
							<h1 className='text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-tight mb-4'>
								Move around Lagos
								<br />
								without the stress.
							</h1>
							<p className='text-[#F7F7F7] text-sm md:text-lg mb-8 max-w-sm leading-relaxed md:max-w-138.25'>
								Book trusted drivers for airport pickups, city rides, and trips
								during your stay.
							</p>
						</div>

						{/* <div className='w-full md:w-auto'>
							<CarRideForm />
						</div> */}
					</div>
				</section>

				<div className='max-w-335 mx-auto px-6 py-14 space-y-14'>
					<section className='bg-[#FAF6F0] p-10 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2'>
						<div className='p-10 flex flex-col justify-center'>
							<h2 className='text-xl font-semibold text-neutral-900 mb-3'>
								Planning your next visit to Lagos?
							</h2>
							<p className='text-sm text-neutral-600 leading-relaxed mb-6'>
								Schedule reliable rides in advance from airport transfers to
								full day drivers so you can move around Lagos with ease.
							</p>
							<Link
								href='/car-ride/book'
								className='inline-block bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors w-fit'>
								Book a ride
							</Link>
						</div>
						<div className='aspect-video md:aspect-auto overflow-hidden'>
							<img
								src='/images/lagos-skyline.svg'
								alt='Lagos skyline'
								className='w-full h-full object-cover'
							/>
						</div>
					</section>
				</div>

				<div className='py-14 space-y-14'>
					<HowItWorks />
					<FAQSection />
				</div>
			</main>

			<Footer />
		</>
	);
}
