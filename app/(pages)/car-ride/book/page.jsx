'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/layout/Navbar';

const RIDE_OPTIONS = [
	{ id: 'executive', label: 'Executive saloon', seats: 5, price: 45 },
	{ id: 'suv', label: 'SUV', seats: 4, price: 60 },
	{ id: 'electric', label: 'Electric car', seats: 4, price: 75 },
];

const RIDE_TYPES = [
	'Half day hire (4hrs)',
	'Full day hire (8hrs)',
	'Point to point',
];

export default function BookRidePage() {
	const [tab, setTab] = useState('car');
	const [rideType, setRideType] = useState('');
	const [pickupAddress, setPickupAddress] = useState('');
	const [pickupTime, setPickupTime] = useState('now');
	const [airportMode, setAirportMode] = useState('pickup');
	const [flightNumber, setFlightNumber] = useState('');
	const [arrivalAirport, setArrivalAirport] = useState('');
	const [dropoffAddress, setDropoffAddress] = useState('');
	const [showRides, setShowRides] = useState(false);
	const [selectedRide, setSelectedRide] = useState(null);

	const canSeePrice =
		tab === 'car' ? pickupAddress : flightNumber && arrivalAirport;

	function handleSeePrices() {
		if (!canSeePrice) return;
		setShowRides(true);
	}

	return (
		<>
			<Navbar />

			<main className='min-h-screen bg-white'>
				<div className='max-w-335 mx-auto px-6 py-6'>
					<Link
						href='/car-ride'
						className='inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-6'>
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

					<h1 className='text-2xl font-semibold text-neutral-900 mb-6'>
						Book a ride
					</h1>

					<div className='flex flex-col md:flex-row gap-6'>
						<div className='w-full md:w-[332px] flex-shrink-0'>
							<div className='bg-[#FAF6F0] rounded-2xl border-2 border-primary/30 p-5'>
								<div className='flex mb-5'>
									{['car', 'airport'].map((t) => (
										<button
											key={t}
											onClick={() => {
												setTab(t);
												setShowRides(false);
											}}
											className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors ${
												tab === t ?
													'bg-[#B5451B1A] text-neutral-900'
												:	'text-neutral-600'
											}`}>
											{t === 'car' ? 'Car ride' : 'Airport transfers'}
										</button>
									))}
								</div>

								{tab === 'car' ?
									<div className='divide-y divide-neutral-100'>
										{/* <div className='flex items-center gap-3 py-3'>
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
												className='flex-1 bg-transparent text-sm focus:outline-none appearance-none text-neutral-700'>
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
										</div> */}
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
												className='flex-1 bg-transparent text-sm focus:outline-none placeholder:text-neutral-400 text-neutral-700'
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
												className='flex-1 bg-transparent text-sm focus:outline-none appearance-none text-neutral-700'>
												<option value='now'>Pick up now</option>
												<option value='scheduled'>Schedule</option>
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
								:	<div>
										<div className='flex gap-4 mb-4'>
											{['pickup', 'dropoff'].map((mode) => (
												<label
													key={mode}
													className='flex items-center gap-2 cursor-pointer'>
													<input
														type='radio'
														name='mode'
														value={mode}
														checked={airportMode === mode}
														onChange={() => setAirportMode(mode)}
														className='accent-neutral-900'
													/>
													<span className='text-sm text-neutral-700'>
														{mode === 'pickup' ?
															'Airport pick-up'
														:	'Airport drop-off'}
													</span>
												</label>
											))}
										</div>
										<div className='divide-y divide-neutral-100'>
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
													className='flex-1 bg-transparent text-sm focus:outline-none placeholder:text-neutral-400 text-neutral-700'
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
													className='flex-1 bg-transparent text-sm focus:outline-none placeholder:text-neutral-400 text-neutral-700'
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
													className='flex-1 bg-transparent text-sm focus:outline-none placeholder:text-neutral-400 text-neutral-700'
												/>
											</div>
										</div>
									</div>
								}

								<button
									onClick={handleSeePrices}
									className={`mt-5 w-full py-3 rounded-xl text-sm font-semibold transition-colors ${
										canSeePrice ?
											'bg-primary hover:bg-primary-hover text-white'
										:	'bg-neutral-100 text-neutral-400 cursor-not-allowed'
									}`}>
									See prices
								</button>
							</div>
						</div>

						<div className='flex-1 flex flex-col gap-6'>
							{showRides && (
								<div>
									<h2 className='text-lg font-semibold text-neutral-900 mb-4'>
										Choose a ride
									</h2>
									<div className='space-y-3 mb-5'>
										{RIDE_OPTIONS.map((ride) => (
											<button
												key={ride.id}
												onClick={() => setSelectedRide(ride.id)}
												className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-colors ${
													selectedRide === ride.id ?
														'border-neutral-900'
													:	'border-neutral-100 hover:border-neutral-200'
												}`}>
												<div className='w-16 h-12 bg-neutral-100 rounded-lg flex-shrink-0' />
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
									<button
										className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-colors ${
											selectedRide ?
												'bg-primary hover:bg-primary-hover text-white'
											:	'bg-neutral-100 text-neutral-400 cursor-not-allowed'
										}`}>
										Pay deposit
									</button>
								</div>
							)}

							<div className='flex-1 min-h-96 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200'>
								<iframe
									src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46676347!2d3.1191195!3d6.5480357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1700000000000'
									width='100%'
									height='100%'
									style={{ border: 0, minHeight: '400px' }}
									allowFullScreen
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'
									title='Lagos map'
								/>
							</div>
						</div>
					</div>
				</div>

				<div className='bg-brand-dark mt-10 py-6'>
					<div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4'>
						<div className='flex gap-6'>
							<Link
								href='/terms'
								className='text-xs text-neutral-500 hover:text-neutral-300'>
								Terms of Service
							</Link>
							<Link
								href='/privacy'
								className='text-xs text-neutral-500 hover:text-neutral-300'>
								Privacy Policy
							</Link>
						</div>
						<p className='text-xs text-neutral-500'>
							© 2026 Orí Stays. All rights reserved.
						</p>
						<div className='flex gap-3'>
							{['F', 'T', 'I', 'in'].map((icon) => (
								<div
									key={icon}
									className='w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold'>
									{icon}
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
