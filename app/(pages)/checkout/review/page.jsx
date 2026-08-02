'use client';

// ⚠️ TEMPORARILY OUT OF FLOW — Review & Pay step (included airport pickup).
// Cars are not available yet (may return next year). This page is no longer linked
// from checkout. Kept intact so the car ride flow can be restored later.

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import BookingStepIndicator from '@/app/components/checkout/Bookingstepindicator';

export default function ReviewPayPage() {
	const router = useRouter();

	const pricePerNight = 70;
	const nights = 2;
	const subtotal = pricePerNight * nights;
	const fees = 20;
	const apartmentTotal = subtotal + fees;
	const ridePrice = 45;
	const total = apartmentTotal + ridePrice;
	const deposit = Math.round(total * 0.4);
	const balance = total - deposit;

	return (
		<>
			<Navbar />

			<main className='max-w-2xl mx-auto px-6 py-8'>
				<div className='flex items-center gap-4 mb-8'>
					<Link
						href='/checkout/add-ride'
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
						Review & Pay
					</h1>
				</div>

				<BookingStepIndicator currentStep={3} />

				<div className='bg-white border border-neutral-200 rounded-2xl overflow-hidden'>
					<div className='p-5 border-b border-neutral-100'>
						<h2 className='text-base font-semibold text-neutral-900 mb-4'>
							Booking details
						</h2>
						<div className='flex items-center gap-4 mb-5'>
							<div className='w-24 h-20 rounded-xl bg-neutral-200 overflow-hidden flex-shrink-0'>
								<img
									src='/images/apartment-placeholder.jpg'
									alt='Apartment'
									className='w-full h-full object-cover'
								/>
							</div>
							<div>
								<h3 className='text-sm font-semibold text-neutral-900'>
									Modern loft apartment
								</h3>
								<p className='text-xs text-neutral-500 mt-0.5'>
									Entire studio apartment in Lekki, Lagos
								</p>
								<div className='flex items-center gap-1 mt-1.5'>
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

						<div className='space-y-3 text-sm'>
							<div className='flex justify-between'>
								<span className='font-medium text-neutral-900'>Dates</span>
								<span className='text-neutral-600'>March 18 – 20</span>
							</div>
							<div className='flex justify-between'>
								<span className='font-medium text-neutral-900'>Guests</span>
								<span className='text-neutral-600'>2 adults</span>
							</div>
							<div className='flex items-center justify-between'>
								<span className='font-medium text-neutral-900'>Price</span>
								<div className='flex items-center gap-2'>
									<span className='text-xs border border-neutral-200 px-2 py-0.5 rounded text-neutral-600'>
										USD ↓
									</span>
									<span className='text-neutral-900 font-semibold'>
										${apartmentTotal}
									</span>
								</div>
							</div>
							<button className='text-sm text-neutral-900 underline'>
								Price breakdown
							</button>
						</div>
					</div>

					<div className='p-5 border-b border-neutral-100'>
						<h2 className='text-base font-semibold text-neutral-900 mb-4'>
							Airport pickup
						</h2>
						<div className='flex items-center gap-4 p-3 bg-neutral-50 rounded-xl border border-neutral-200'>
							<div className='w-14 h-10 bg-neutral-200 rounded-lg flex-shrink-0' />
							<div className='flex-1 text-sm font-medium text-neutral-900'>
								Executive saloon{' '}
								<span className='text-neutral-500 text-xs'>👤 5</span>
							</div>
							<span className='text-sm font-semibold text-neutral-900'>
								${ridePrice}
							</span>
						</div>
					</div>

					<div className='p-5'>
						<div className='flex items-center justify-between mb-2'>
							<div className='flex items-center gap-2'>
								<span className='text-sm font-semibold text-neutral-900'>
									Total
								</span>
								<span className='text-xs border border-neutral-200 px-2 py-0.5 rounded text-neutral-600'>
									USD ↓
								</span>
							</div>
							<span className='text-base font-bold text-neutral-900'>
								${total}
							</span>
						</div>
						<p className='text-xs text-neutral-500 mb-5'>
							Pay ${deposit} today (40%). Balance of ${balance} due 48hrs before
							arrival.
						</p>

						<button
							onClick={() => router.push('/booking-confirmed')}
							className='w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-xl text-sm transition-colors'>
							Pay deposit – ${deposit}
						</button>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
}
