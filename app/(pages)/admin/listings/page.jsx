'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, LayoutGrid, List } from 'lucide-react';
import { ADMIN_LISTINGS, getStatusStyle } from '@/app/lib/data/admin';

const LISTING_IMAGES = [
	'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1505873242700-f289a29e1724?w=400&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&auto=format&fit=crop',
];

export default function AdminListingsPage() {
	const [query, setQuery] = useState('');
	const [view, setView] = useState('grid');

	const filtered = ADMIN_LISTINGS.filter(
		(l) =>
			l.name.toLowerCase().includes(query.toLowerCase()) ||
			l.host.toLowerCase().includes(query.toLowerCase())
	);

	return (
		<>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100 flex items-center justify-between'>
				<h1 className='text-xl font-bold text-neutral-900'>Listings</h1>
				<div className='flex items-center gap-3'>
					<div className='flex items-center gap-2 border border-neutral-200 rounded-xl px-3 py-2'>
						<Search size={15} strokeWidth={1.5} className='text-neutral-400 shrink-0' />
						<input
							type='text'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder='Search listings'
							className='text-sm text-neutral-900 placeholder:text-neutral-400 bg-transparent outline-none w-52'
						/>
					</div>
					<div className='flex items-center border border-neutral-200 rounded-xl overflow-hidden'>
						<button
							onClick={() => setView('grid')}
							className={`p-2 ${view === 'grid' ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-400 hover:bg-neutral-50'}`}>
							<LayoutGrid size={16} strokeWidth={1.5} />
						</button>
						<button
							onClick={() => setView('list')}
							className={`p-2 ${view === 'list' ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-400 hover:bg-neutral-50'}`}>
							<List size={16} strokeWidth={1.5} />
						</button>
					</div>
				</div>
			</div>

			<div className='flex-1 overflow-auto px-8 py-6'>
				<div className='grid grid-cols-3 gap-5'>
					{filtered.map((listing, i) => (
						<div key={listing.id} className='border border-neutral-100 rounded-2xl overflow-hidden'>
							<div className='relative h-44'>
								<img
									src={LISTING_IMAGES[i % LISTING_IMAGES.length]}
									alt={listing.name}
									className='w-full h-full object-cover'
								/>
								<span className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full ${getStatusStyle(listing.status)}`}>
									{listing.status}
								</span>
							</div>
							<div className='p-4'>
								<p className='text-sm font-bold text-neutral-900 mb-1 truncate'>{listing.name}</p>
								<p className='text-xs text-neutral-400 mb-3 truncate'>{listing.address}</p>
								<div className='flex items-center justify-between text-xs text-neutral-500 mb-4'>
									<span>Host: <span className='text-neutral-700 font-medium'>{listing.host}</span></span>
									<span className='font-semibold text-neutral-900'>{listing.price}<span className='font-normal text-neutral-400'>/night</span></span>
								</div>
								<div className='flex items-center justify-between'>
									<p className='text-xs text-neutral-400'>Submitted {listing.date}</p>
									<Link
										href={`/admin/listings/${listing.id}`}
										className='text-xs font-medium text-neutral-700 border border-neutral-200 px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors'>
										View details
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
