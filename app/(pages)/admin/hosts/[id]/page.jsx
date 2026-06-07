import Link from 'next/link';
import { ChevronLeft, MoreVertical, Phone, Mail, MapPin, Calendar, ShieldCheck } from 'lucide-react';
import { ADMIN_HOSTS, HOST_LISTINGS, getStatusStyle } from '@/app/lib/data/admin';

const LISTING_IMAGE = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=120&auto=format&fit=crop';

function StatusBadge({ status }) {
	return (
		<span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusStyle(status)}`}>
			{status}
		</span>
	);
}

export default function AdminHostDetailPage({ params }) {
	const host = ADMIN_HOSTS.find((h) => h.id === params.id) ?? ADMIN_HOSTS[0];

	return (
		<>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100'>
				<Link href='/admin/hosts' className='flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800 mb-4'>
					<ChevronLeft size={16} strokeWidth={1.5} />
					Back to hosts
				</Link>
				<h1 className='text-xl font-bold text-neutral-900'>Host detail</h1>
			</div>

			<div className='flex-1 overflow-auto px-8 py-6'>
				<div className='border border-neutral-100 rounded-2xl p-6 mb-6'>
					<div className='flex items-start justify-between mb-6'>
						<div className='flex items-center gap-4'>
							<div className='w-16 h-16 rounded-full bg-brand-dark flex items-center justify-center shrink-0'>
								<span className='text-white text-xl font-bold'>{host.name[0]}</span>
							</div>
							<div>
								<p className='text-lg font-bold text-neutral-900 mb-1'>{host.name}</p>
								<div className='flex items-center gap-1.5'>
									<ShieldCheck size={14} strokeWidth={1.5} className='text-green-600' />
									<span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusStyle(host.status)}`}>
										{host.status}
									</span>
								</div>
							</div>
						</div>
						<button className='text-neutral-400 hover:text-neutral-700'>
							<MoreVertical size={18} strokeWidth={1.5} />
						</button>
					</div>

					<div className='grid grid-cols-4 gap-4'>
						<div className='flex items-center gap-2.5'>
							<Phone size={15} strokeWidth={1.5} className='text-neutral-400 shrink-0' />
							<div>
								<p className='text-xs text-neutral-400'>Phone</p>
								<p className='text-sm font-medium text-neutral-900'>{host.phone}</p>
							</div>
						</div>
						<div className='flex items-center gap-2.5'>
							<Mail size={15} strokeWidth={1.5} className='text-neutral-400 shrink-0' />
							<div>
								<p className='text-xs text-neutral-400'>Email</p>
								<p className='text-sm font-medium text-neutral-900'>{host.email}</p>
							</div>
						</div>
						<div className='flex items-center gap-2.5'>
							<MapPin size={15} strokeWidth={1.5} className='text-neutral-400 shrink-0' />
							<div>
								<p className='text-xs text-neutral-400'>Location</p>
								<p className='text-sm font-medium text-neutral-900'>{host.location}</p>
							</div>
						</div>
						<div className='flex items-center gap-2.5'>
							<Calendar size={15} strokeWidth={1.5} className='text-neutral-400 shrink-0' />
							<div>
								<p className='text-xs text-neutral-400'>Member since</p>
								<p className='text-sm font-medium text-neutral-900'>{host.since}</p>
							</div>
						</div>
					</div>
				</div>

				<div className='border border-neutral-100 rounded-2xl'>
					<div className='px-5 py-4 border-b border-neutral-100'>
						<p className='text-sm font-bold text-neutral-900'>Listings ({host.listings})</p>
					</div>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-neutral-100'>
								{['Property name', 'Location', 'Price per night', 'Date submitted', 'Status'].map((h) => (
									<th key={h} className='px-5 py-3 text-left text-xs font-medium text-neutral-400'>{h}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{HOST_LISTINGS.map((listing, i) => (
								<tr key={i} className='border-b border-neutral-50 hover:bg-neutral-50/50'>
									<td className='px-5 py-3.5'>
										<div className='flex items-center gap-3'>
											<div className='w-10 h-10 rounded-xl bg-neutral-100 overflow-hidden shrink-0'>
												<img src={LISTING_IMAGE} alt='' className='w-full h-full object-cover' />
											</div>
											<Link href={`/admin/listings/${listing.id}`} className='text-sm font-medium text-neutral-900 hover:text-primary'>
												{listing.name}
											</Link>
										</div>
									</td>
									<td className='px-5 py-3.5 text-sm text-neutral-600'>{listing.address}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700 font-medium'>{listing.price}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-600'>{listing.date}</td>
									<td className='px-5 py-3.5'><StatusBadge status={listing.status} /></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
