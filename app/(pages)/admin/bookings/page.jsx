'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { ADMIN_HOME_BOOKINGS, ADMIN_RIDES, getStatusStyle } from '@/app/lib/data/admin';

const TABS = ['Homes', 'Rides'];

function StatusBadge({ status }) {
	return (
		<span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusStyle(status)}`}>
			{status}
		</span>
	);
}

export default function AdminBookingsPage() {
	const [tab, setTab] = useState('Homes');

	return (
		<>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100 flex items-center justify-between'>
				<h1 className='text-xl font-bold text-neutral-900'>Bookings</h1>
				<button className='flex items-center gap-2 border border-neutral-200 text-neutral-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-neutral-50 transition-colors'>
					<SlidersHorizontal size={15} strokeWidth={1.5} />
					Filter
				</button>
			</div>

			<div className='flex-1 overflow-auto px-8 py-6'>
				<div className='flex items-center gap-1 bg-neutral-100 rounded-xl p-1 w-fit mb-6'>
					{TABS.map((t) => (
						<button
							key={t}
							onClick={() => setTab(t)}
							className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
								tab === t ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
							}`}>
							{t}
						</button>
					))}
				</div>

				<div className='border border-neutral-100 rounded-2xl'>
					{tab === 'Homes' ? (
						<table className='w-full'>
							<thead>
								<tr className='border-b border-neutral-100'>
									{['Booking ID', 'Property', 'Guest', 'Check in', 'Nights', 'Amount', 'Status'].map((h) => (
										<th key={h} className='px-5 py-3 text-left text-xs font-medium text-neutral-400'>{h}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{ADMIN_HOME_BOOKINGS.map((b, i) => (
									<tr key={i} className='border-b border-neutral-50 hover:bg-neutral-50/50'>
										<td className='px-5 py-3.5'>
											<Link href={`/admin/bookings/${i + 1}`} className='text-sm text-primary font-medium hover:underline'>
												{b.id}
											</Link>
										</td>
										<td className='px-5 py-3.5 text-sm text-neutral-700'>{b.property}</td>
										<td className='px-5 py-3.5 text-sm text-neutral-700'>{b.guest}</td>
										<td className='px-5 py-3.5 text-sm text-neutral-700'>{b.checkIn}</td>
										<td className='px-5 py-3.5 text-sm text-neutral-700'>{b.nights}</td>
										<td className='px-5 py-3.5 text-sm text-neutral-700'>{b.amount}</td>
										<td className='px-5 py-3.5'><StatusBadge status={b.status} /></td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<table className='w-full'>
							<thead>
								<tr className='border-b border-neutral-100'>
									{['Ride ID', 'Ride type', 'Guest', 'Driver', 'Amount', 'Status'].map((h) => (
										<th key={h} className='px-5 py-3 text-left text-xs font-medium text-neutral-400'>{h}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{ADMIN_RIDES.map((r, i) => (
									<tr key={i} className='border-b border-neutral-50 hover:bg-neutral-50/50'>
										<td className='px-5 py-3.5'>
											<Link href={`/admin/bookings/r-${i + 1}`} className='text-sm text-primary font-medium hover:underline'>
												{r.id}
											</Link>
										</td>
										<td className='px-5 py-3.5 text-sm text-neutral-700'>{r.type}</td>
										<td className='px-5 py-3.5 text-sm text-neutral-700'>{r.guest}</td>
										<td className='px-5 py-3.5 text-sm text-neutral-700'>{r.driver}</td>
										<td className='px-5 py-3.5 text-sm text-neutral-700'>{r.amount}</td>
										<td className='px-5 py-3.5'><StatusBadge status={r.status} /></td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</>
	);
}
