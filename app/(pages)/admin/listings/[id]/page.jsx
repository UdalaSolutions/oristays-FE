'use client';

import Link from 'next/link';
import { ChevronLeft, MoreVertical, Phone, MessageSquare, MapPin, Home, Users, DollarSign } from 'lucide-react';
import { ADMIN_LISTINGS, getStatusStyle } from '@/app/lib/data/admin';

const LISTING_IMAGE = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop';

function DetailRow({ icon: Icon, label, value }) {
	return (
		<div className='flex items-center gap-3 py-3 border-b border-neutral-50'>
			{Icon && <Icon size={16} strokeWidth={1.5} className='text-neutral-400 shrink-0' />}
			<div className='flex-1 flex items-center justify-between'>
				<p className='text-sm text-neutral-500'>{label}</p>
				<p className='text-sm font-medium text-neutral-900'>{value}</p>
			</div>
		</div>
	);
}

export default function AdminListingDetailPage({ params }) {
	const listing = ADMIN_LISTINGS.find((l) => l.id === params.id) ?? ADMIN_LISTINGS[0];

	return (
		<div className='flex-1 overflow-auto'>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100'>
				<Link href='/admin/listings' className='flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800 mb-4'>
					<ChevronLeft size={16} strokeWidth={1.5} />
					Back to listings
				</Link>
				<h1 className='text-xl font-bold text-neutral-900'>Listing detail</h1>
			</div>

			<div className='grid grid-cols-[1fr_420px]'>
				<div className='px-8 py-6 border-r border-neutral-100'>
					<div className='flex items-start justify-between mb-1'>
						<h2 className='text-lg font-bold text-neutral-900 flex-1 pr-4'>{listing.name}</h2>
						<button className='text-neutral-400 hover:text-neutral-700'>
							<MoreVertical size={18} strokeWidth={1.5} />
						</button>
					</div>

					<div className='flex items-center gap-1.5 text-sm text-neutral-400 mb-1'>
						<MapPin size={14} strokeWidth={1.5} />
						<span>{listing.address}</span>
					</div>

					<div className='flex items-center gap-2 mb-8'>
						<span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusStyle(listing.status)}`}>
							{listing.status}
						</span>
						<span className='text-xs text-neutral-400'>Submitted {listing.date}</span>
					</div>

					<div className='mb-8'>
						<p className='text-sm font-bold text-neutral-900 mb-1'>Property details</p>
						<DetailRow icon={Home} label='Property type' value='Apartment' />
						<DetailRow icon={Users} label='Max guests' value='4 guests' />
						<DetailRow icon={DollarSign} label='Price per night' value={listing.price} />
					</div>

					<div>
						<p className='text-sm font-bold text-neutral-900 mb-4'>Hosted by</p>
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center shrink-0'>
								<span className='text-white text-sm font-bold'>{listing.host[0]}</span>
							</div>
							<div>
								<p className='text-sm font-semibold text-neutral-900'>{listing.host}</p>
								<p className='text-xs text-neutral-400'>2 years hosting</p>
							</div>
						</div>
						<div className='space-y-1'>
							<button className='w-full flex items-center gap-3 px-4 py-3 border border-neutral-100 rounded-xl hover:bg-neutral-50 transition-colors text-left'>
								<MessageSquare size={16} strokeWidth={1.5} className='text-neutral-500' />
								<span className='text-sm font-medium text-neutral-900'>Message host</span>
							</button>
							<button className='w-full flex items-center gap-3 px-4 py-3 border border-neutral-100 rounded-xl hover:bg-neutral-50 transition-colors text-left'>
								<Phone size={16} strokeWidth={1.5} className='text-neutral-500' />
								<span className='text-sm font-medium text-neutral-900'>Call host</span>
							</button>
						</div>
					</div>
				</div>

				<div className='py-6 px-6'>
					<div className='w-full h-80 rounded-2xl bg-neutral-100 overflow-hidden'>
						<img
							src={LISTING_IMAGE}
							alt={listing.name}
							className='w-full h-full object-cover'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
