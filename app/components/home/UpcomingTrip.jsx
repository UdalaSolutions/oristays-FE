'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const TRIPS = [
	{ id: 1, name: 'Modern loft apartment', dates: 'Mar 21 - 23', status: 'Confirmed', image: '/images/apartment-placeholder.jpg', href: '/apartments/modern-loft-apartment-0' },
	{ id: 2, name: 'Da\'ville Apartment', dates: 'Apr 5 - 8', status: 'Confirmed', image: '/images/apartment-placeholder.jpg', href: '/apartments/modern-loft-apartment-1' },
	{ id: 3, name: 'Luxury suite Ikoyi', dates: 'Apr 15 - 18', status: 'Confirmed', image: '/images/apartment-placeholder.jpg', href: '/apartments/modern-loft-apartment-2' },
];

export function UpcomingTrip() {
	const [index, setIndex] = useState(0);
	const trip = TRIPS[index];

	return (
		<section>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl md:text-2xl font-bold text-black'>Upcoming trip</h2>
				<div className='flex items-center gap-1'>
					<button
						onClick={() => setIndex((i) => Math.max(0, i - 1))}
						disabled={index === 0}
						className='w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-neutral-400 disabled:opacity-30 transition-colors'>
						<ChevronLeft size={16} strokeWidth={1.5} />
					</button>
					<button
						onClick={() => setIndex((i) => Math.min(TRIPS.length - 1, i + 1))}
						disabled={index === TRIPS.length - 1}
						className='w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-neutral-400 disabled:opacity-30 transition-colors'>
						<ChevronRight size={16} strokeWidth={1.5} />
					</button>
				</div>
			</div>

			<Link href={trip.href} className='flex items-center gap-4 border border-neutral-100 rounded-2xl p-3 hover:bg-neutral-50 transition-colors'>
				<div className='relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 shrink-0'>
					<Image src={trip.image} alt={trip.name} fill className='object-cover' />
				</div>
				<div className='flex-1 min-w-0'>
					<p className='text-sm font-bold text-neutral-900 truncate'>{trip.name}</p>
					<p className='text-xs text-neutral-500 mt-0.5'>{trip.dates}</p>
				</div>
				<span className='shrink-0 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full'>
					{trip.status}
				</span>
			</Link>
		</section>
	);
}
