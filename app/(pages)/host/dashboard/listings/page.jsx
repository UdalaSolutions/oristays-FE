'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { LISTINGS } from '@/app/lib/data/listings';
import ListingCard from '@/app/components/host/ListingCard';
import EmptyState from '@/app/components/host/EmptyState';

const HAS_LISTINGS = true;

export default function ListingsPage() {
	return (
		<div className='flex flex-col flex-1'>
			<div className='flex items-center justify-between px-8 pt-8 pb-6 border-b border-neutral-100'>
				<h1 className='text-xl font-bold text-neutral-900'>My listings</h1>
				{HAS_LISTINGS && (
					<Link
						href='/host/dashboard/listings/create'
						className='flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors'>
						<Plus size={16} strokeWidth={2} />
						Add listing
					</Link>
				)}
			</div>

			<div className='px-8 py-6 flex-1'>
				{HAS_LISTINGS ? (
					<div className='grid grid-cols-3 gap-6'>
						{LISTINGS.map((listing) => (
							<ListingCard
								key={listing.id}
								listing={listing}
							/>
						))}
					</div>
				) : (
					<EmptyState
						message='Create your first listing to start getting booked'
						href='/host/dashboard/listings/create'
						label='Create listing'
					/>
				)}
			</div>
		</div>
	);
}
