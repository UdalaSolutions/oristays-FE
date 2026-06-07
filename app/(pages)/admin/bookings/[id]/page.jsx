'use client';

import Link from 'next/link';
import { ChevronLeft, Phone, MessageSquare } from 'lucide-react';
import { getStatusStyle } from '@/app/lib/data/admin';

const BOOKING = {
	id: 'BK-2026-001',
	status: 'Ongoing',
	property: 'Modern loft apartment',
	checkIn: 'Mar 30, 2027',
	checkOut: 'Apr 4, 2027',
	booker: 'Adaeze Okonkwo',
	reference: 'BK-2026-001',
	guests: 2,
	price: '₦250,000',
	address: '21 Green Gate Estate, Victoria Island, Lagos',
	cancellationPolicy: 'Free cancellation for 24 hours after booking. After that, if the guest cancels before check-in, the first night is non-refundable.',
	host: {
		name: 'John Adeyemi',
		since: '2 years hosting',
	},
	houseRules: [
		'Check in: 3:00 PM – 11:00 PM',
		'Checkout before 12:00 PM',
		'No smoking',
		'No pets',
		'No parties or events',
	],
};

function DetailRow({ label, value }) {
	return (
		<div className='flex items-center justify-between py-3 border-b border-neutral-50'>
			<p className='text-sm text-neutral-500'>{label}</p>
			<p className='text-sm font-medium text-neutral-900'>{value}</p>
		</div>
	);
}

export default function BookingDetailPage() {
	return (
		<div className='flex-1 overflow-auto'>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100'>
				<Link href='/admin/bookings' className='flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800 mb-4'>
					<ChevronLeft size={16} strokeWidth={1.5} />
					Back to bookings
				</Link>
				<h1 className='text-xl font-bold text-neutral-900'>Booking detail</h1>
			</div>

			<div className='grid grid-cols-[1fr_420px] gap-0 flex-1'>
				<div className='px-8 py-6 border-r border-neutral-100'>
					<div className='flex items-center gap-3 mb-6'>
						<span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(BOOKING.status)}`}>
							{BOOKING.status}
						</span>
					</div>

					<h2 className='text-lg font-bold text-neutral-900 mb-6'>{BOOKING.property}</h2>

					<div className='grid grid-cols-2 gap-4 mb-8'>
						<div className='border border-neutral-100 rounded-2xl p-4'>
							<p className='text-xs text-neutral-400 mb-1'>Check-in</p>
							<p className='text-sm font-bold text-neutral-900'>{BOOKING.checkIn}</p>
							<p className='text-xs text-neutral-400 mt-0.5'>After 3:00 PM</p>
						</div>
						<div className='border border-neutral-100 rounded-2xl p-4'>
							<p className='text-xs text-neutral-400 mb-1'>Checkout</p>
							<p className='text-sm font-bold text-neutral-900'>{BOOKING.checkOut}</p>
							<p className='text-xs text-neutral-400 mt-0.5'>Before 12:00 PM</p>
						</div>
					</div>

					<div className='mb-8'>
						<p className='text-sm font-bold text-neutral-900 mb-1'>Reservation details</p>
						<DetailRow label='Booker' value={BOOKING.booker} />
						<DetailRow label='Reference' value={BOOKING.reference} />
						<DetailRow label='Guests' value={BOOKING.guests} />
						<DetailRow label='Price' value={BOOKING.price} />
						<DetailRow label='Address' value={BOOKING.address} />
					</div>

					<div className='mb-8'>
						<p className='text-sm font-bold text-neutral-900 mb-3'>Cancellation policy</p>
						<p className='text-sm text-neutral-500 leading-relaxed'>{BOOKING.cancellationPolicy}</p>
					</div>

					<div className='mb-8'>
						<p className='text-sm font-bold text-neutral-900 mb-4'>Host</p>
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center shrink-0'>
								<span className='text-white text-sm font-bold'>J</span>
							</div>
							<div>
								<p className='text-sm font-semibold text-neutral-900'>{BOOKING.host.name}</p>
								<p className='text-xs text-neutral-400'>{BOOKING.host.since}</p>
							</div>
						</div>
						<div className='space-y-1'>
							<button className='w-full flex items-center gap-3 px-4 py-3 border border-neutral-100 rounded-xl hover:bg-neutral-50 transition-colors text-left'>
								<Phone size={16} strokeWidth={1.5} className='text-neutral-500' />
								<span className='text-sm font-medium text-neutral-900'>Call host</span>
							</button>
							<button className='w-full flex items-center gap-3 px-4 py-3 border border-neutral-100 rounded-xl hover:bg-neutral-50 transition-colors text-left'>
								<MessageSquare size={16} strokeWidth={1.5} className='text-neutral-500' />
								<span className='text-sm font-medium text-neutral-900'>Message host</span>
							</button>
						</div>
					</div>

					<div>
						<p className='text-sm font-bold text-neutral-900 mb-3'>House rules</p>
						<ul className='space-y-2'>
							{BOOKING.houseRules.map((rule, i) => (
								<li key={i} className='text-sm text-neutral-600 flex items-start gap-2'>
									<span className='text-neutral-300 mt-0.5'>•</span>
									{rule}
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className='py-6 px-6'>
					<div className='w-full h-80 rounded-2xl bg-neutral-100 overflow-hidden'>
						<img
							src='https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop'
							alt='Property'
							className='w-full h-full object-cover'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
