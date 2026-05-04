'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MoveLeft, Share2 } from 'lucide-react';
import { Icon } from '@iconify/react';
import {
	LogIn,
	ParkingCircle,
	Wifi,
	AirVent,
	Headphones,
	Camera,
} from 'lucide-react';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import DateRangePicker from '@/app/components/ui/Daterangepicker';

const AMENITIES = [
	{ icon: LogIn, label: 'Self check-in' },
	{ icon: ParkingCircle, label: 'Free parking' },
	{ icon: Wifi, label: 'Wifi' },
	{ icon: AirVent, label: 'Air conditioning' },
	{ icon: Headphones, label: '24hr room support' },
	{ icon: Camera, label: 'Security camera' },
];

const REVIEWS = [
	{
		name: 'Adaeze Okonkwo',
		location: 'London, United Kingdom',
		date: 'January 2026',
		trip: 'Family trip',
		rating: 5,
		text: 'Spacious and comfortable for our family stay. Booking a driver for the day made getting around very easy.',
	},
	{
		name: 'Marcus Osei',
		location: 'Amsterdam, Netherland',
		date: 'January 2026',
		trip: 'Business',
		rating: 5,
		text: 'Great place for a work trip. Fast Wifi, quiet environment, and the airport pickup was very smooth.',
	},
];

const HOUSE_RULES = [
	{
		icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
		rule: 'Check-in after 2:00 PM',
		side: 'left',
	},
	{
		icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636',
		rule: 'No children allowed',
		side: 'right',
	},
	{
		icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
		rule: 'Checkout before 12:00 PM',
		side: 'left',
	},
	{
		icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636',
		rule: 'No parties or events',
		side: 'right',
	},
	{
		icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
		rule: '5 guests maximum',
		side: 'left',
	},
	{
		icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636',
		rule: 'No smoking',
		side: 'right',
	},
];

const NEARBY = [
	{ name: 'Sky Lounge', distance: '450m' },
	{ name: "Debbie's cake & creamery", distance: '800m' },
	{ name: 'Spar market – Lekki', distance: '1km' },
	{ name: 'Coffee shop', distance: '600m' },
];

export default function ApartmentDetailPage({ params }) {
	const [guests, setGuests] = useState(2);
	const pricePerNight = 70;
	const nights = 2;
	const subtotal = pricePerNight * nights;
	const fees = 20;
	const total = subtotal + fees;
	const deposit = Math.round(total * 0.4);
	const balance = total - deposit;

	return (
		<>
			<Navbar />

			<main className='max-w-335 mx-auto px-6 py-14'>
				<div className='flex items-center justify-between mb-4'>
					<Link
						href='/apartments'
						className='flex items-center font-medium gap-2 text-sm text-black hover:text-neutral-900'>
						<MoveLeft />
						Back
					</Link>
					<button className='flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900'>
						<Share2 className='w-5.5 h-5.5' />
						Share
					</button>
				</div>

				<div className='grid grid-cols-2 gap-2 rounded-2xl overflow-hidden mb-6 aspect-2/1'>
					<div className='bg-neutral-200 relative'>
						<Image
							height={0}
							width={0}
							src='/images/apartment-main.svg'
							alt='Apartment'
							className='w-full h-full object-cover'
						/>
						<button className='absolute bottom-4 right-4 bg-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-card hover:bg-neutral-50 transition-colors'>
							View all photos
						</button>
					</div>
					<div className='grid grid-cols-2 grid-rows-2 gap-2'>
						{Array.from({ length: 4 }).map((_, i) => (
							<div
								key={i}
								className='bg-neutral-200 overflow-hidden'>
								<Image
									height={0}
									width={0}
									src='/images/apartment-placeholder.jpg'
									alt={`View ${i + 2}`}
									className='w-full h-full object-cover'
								/>
							</div>
						))}
					</div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mt-2'>
					<div className='lg:col-span-2 space-y-10'>
						<div className='flex gap-1 flex-col mt-2'>
							<div className='flex gap-2 mb-3'>
								<span className='bg-[#0D1B2A1A] text-[#0D1B2A] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1'>
									<Icon
										icon='material-symbols:star'
										width='14'
										height='14'
									/>
									New
								</span>
								<span className='bg-primary-light text-primary text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1'>
									<Icon
										icon='material-symbols:star'
										width='14'
										height='14'
									/>
									Premium tier
								</span>
								<span className='bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1'>
									<svg
										className='w-3 h-3'
										fill='none'
										stroke='currentColor'
										strokeWidth={2.5}
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M5 13l4 4L19 7'
										/>
									</svg>
									Ori Verified
								</span>
							</div>
							<h1 className='text-2xl font-semibold text-neutral-900 mb-1'>
								Modern loft apartment by Royal villa
							</h1>
							<p className='text-sm text-neutral-500 mb-2'>
								Entire studio apartment in Lekki, Lagos
							</p>
							<p className='text-sm text-neutral-500'>
								2 guests · 1 bedroom · 1 bed · 1 bath
							</p>
						</div>

						<div className='flex  gap-4 pb-6 border-b border-neutral-100 flex-col'>
							<div className='w-20 h-20 rounded-full bg-brand-dark text-white flex items-center justify-center text-2xl font-bold'>
								A
							</div>
							<div>
								<p className='text-xl font-bold text-black'>
									Hosted by Adeyemi
								</p>
								<p className='text-xs text-neutral-500'>5 years hosting</p>
							</div>
							<button className='h-13 max-w-50 border border-primary-light bg-primary-light text-primary text-xs font-medium px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors'>
								Message host
							</button>
						</div>

						<p className='text-black leading-6'>
							A thoughtfully designed one bedroom premium apartment created for
							comfort, privacy, and a seamless stay. Perfect for up to two
							guests, this space offers a calm, modern atmosphere ideal for both
							short visits and extended stays.
						</p>

						<div className='border-t border-neutral-100 pt-8'>
							<h2 className='text-2xl font-bold leading-6 text-black'>
								Amenities
							</h2>
							<div className='grid grid-cols-2 gap-3 my-5'>
								{AMENITIES.map((a) => (
									<div
										key={a.label}
										className='flex items-center gap-3  text-black'>
										<a.icon
											className='w-6 h-6 text-black shrink-0'
											strokeWidth={1.5}
										/>
										{a.label}
									</div>
								))}
							</div>
							<button className='w-50 h-12.5 mt-5 border border-primary-light bg-primary-light text-primary  font-bold px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors'>
								Show all amenities
							</button>
						</div>

						<div className='border-t border-neutral-100 pt-8'>
							<h2 className='text-lg font-semibold text-neutral-900 mb-3'>
								Map
							</h2>
							<p className='text-sm text-neutral-500 mb-4'>Lekki, Lagos</p>
							<div className='h-52 rounded-xl overflow-hidden bg-neutral-100'>
								<iframe
									src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63389.07348783878!2d3.5502!3d6.4698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53aec4dd415%3A0x169b7533c94ddb4a!2sLekki%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000'
									width='100%'
									height='100%'
									style={{ border: 0 }}
									allowFullScreen
									loading='lazy'
									title='Lekki map'
								/>
							</div>
						</div>

						<div className='border-t border-neutral-100 pt-8'>
							<h2 className='text-lg font-semibold text-neutral-900 mb-2'>
								Select check-in date
							</h2>
							<p className='text-sm text-neutral-500 mb-6'>
								Add travel dates to see prices
							</p>
							<DateRangePicker onDatesChange={({ checkIn, checkOut }) => {}} />
						</div>

						<div className='border-t border-neutral-100 pt-8'>
							<div className='flex items-baseline gap-3 mb-6'>
								<h2 className='text-lg font-semibold text-neutral-900'>
									Guest reviews
								</h2>
								<span className='text-sm text-neutral-500'>(12 reviews)</span>
								<span className='flex items-center gap-1 text-sm ml-auto'>
									<svg
										className='w-4 h-4 text-yellow-400 fill-yellow-400'
										viewBox='0 0 20 20'>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>
									<span className='font-semibold'>4.5</span>
									<span className='text-neutral-500'>/5</span>
								</span>
							</div>
							<div className='space-y-6'>
								{REVIEWS.map((review) => (
									<div
										key={review.name}
										className='bg-neutral-50 rounded-xl p-4'>
										<div className='flex items-center gap-3 mb-3'>
											<div className='w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center text-xs font-semibold text-neutral-700'>
												{review.name[0]}
											</div>
											<div>
												<p className='text-sm font-medium text-neutral-900'>
													{review.name}
												</p>
												<p className='text-xs text-neutral-500'>
													{review.location} · {review.date} · {review.trip}
												</p>
											</div>
										</div>
										<div className='flex mb-2'>
											{Array.from({ length: review.rating }).map((_, i) => (
												<svg
													key={i}
													className='w-3.5 h-3.5 text-yellow-400 fill-yellow-400'
													viewBox='0 0 20 20'>
													<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
												</svg>
											))}
										</div>
										<p className='text-sm text-neutral-700 leading-relaxed'>
											{review.text}
										</p>
									</div>
								))}
							</div>
						</div>

						<div className='border-t border-neutral-100 pt-8'>
							<h2 className='text-lg font-semibold text-neutral-900 mb-5'>
								House rules
							</h2>
							<div className='grid grid-cols-2 gap-3'>
								{HOUSE_RULES.map((rule, i) => (
									<div
										key={i}
										className='flex items-center gap-3 text-sm text-neutral-700'>
										<svg
											className='w-4 h-4 text-neutral-500 flex-shrink-0'
											fill='none'
											stroke='currentColor'
											strokeWidth={1.5}
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d={rule.icon}
											/>
										</svg>
										{rule.rule}
									</div>
								))}
							</div>
						</div>

						<div className='border-t border-neutral-100 pt-8'>
							<h2 className='text-lg font-semibold text-neutral-900 mb-4'>
								What&apos;s nearby
							</h2>
							<div className='grid grid-cols-2 gap-3'>
								{NEARBY.map((item) => (
									<div
										key={item.name}
										className='flex items-center justify-between text-sm'>
										<span className='text-neutral-700'>• {item.name}</span>
										<span className='text-neutral-500'>{item.distance}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='lg:col-span-1'>
						<div className='sticky top-24 bg-white border border-neutral-200 shadow-[0px_0px_30px_3px_#50A0D933] rounded-2xl p-6'>
							<div className='flex items-start justify-between mb-5'>
								<div>
									<span className='text-2xl font-bold text-neutral-900'>
										${pricePerNight}
									</span>
									<span className='text-sm text-neutral-500'>/night</span>
									<p className='text-xs text-green-600 mt-0.5'>
										✓ All-in pricing. No hidden fees.
									</p>
								</div>
								<div className='flex items-center gap-1 text-sm'>
									<svg
										className='w-4 h-4 text-yellow-400 fill-yellow-400'
										viewBox='0 0 20 20'>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>
									<span className='font-semibold'>4.9</span>
								</div>
							</div>

							<div className='border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-200 mb-4'>
								<div className='grid grid-cols-2 divide-x divide-neutral-200'>
									<div className='p-3'>
										<p className='text-xs text-neutral-500 uppercase tracking-wide mb-1'>
											Check-in
										</p>
										<p className='text-sm font-medium text-neutral-900'>
											Mar 18
										</p>
									</div>
									<div className='p-3'>
										<p className='text-xs text-neutral-500 uppercase tracking-wide mb-1'>
											Checkout
										</p>
										<p className='text-sm font-medium text-neutral-900'>
											Mar 20
										</p>
									</div>
								</div>
								<div className='p-3'>
									<p className='text-xs text-neutral-500 uppercase tracking-wide mb-1'>
										Guests
									</p>
									<div className='flex items-center justify-between'>
										<p className='text-sm font-medium text-neutral-900'>
											{guests} adults
										</p>
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
							</div>

							<div className='space-y-2 mb-4 text-sm'>
								<div className='flex justify-between text-neutral-700'>
									<span>
										${pricePerNight} x {nights} nights
									</span>
									<span>${subtotal}</span>
								</div>
								<div className='flex justify-between text-neutral-700'>
									<span>Taxes and fees</span>
									<span>${fees}</span>
								</div>
								<div className='flex justify-between font-semibold text-neutral-900 pt-2 border-t border-neutral-100'>
									<span>Total</span>
									<span>${total}</span>
								</div>
							</div>

							<p className='text-xs text-neutral-500 mb-5'>
								Pay ${deposit} today (40%). Balance of ${balance} due 48hrs
								before arrival.
							</p>

							<Link
								href='/checkout'
								className='w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-xl text-sm text-center block transition-colors'>
								Reserve this apartment
							</Link>

							<p className='text-xs text-primary text-center mt-3 underline cursor-pointer'>
								Free cancellation up to 72 hours before arrival
							</p>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
}
