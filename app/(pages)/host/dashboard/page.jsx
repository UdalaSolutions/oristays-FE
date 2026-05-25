'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RESERVATIONS, RESERVATION_TABS } from '@/app/lib/data/reservations';
import ReservationCard from '@/app/components/host/ReservationCard';
import PageHeader from '@/app/components/host/PageHeader';
import TabBar from '@/app/components/host/TabBar';
import FilterButton from '@/app/components/host/FilterButton';
import EmptyState from '@/app/components/host/EmptyState';

export default function ReservationsPage() {
	const [activeTab, setActiveTab] = useState('All');

	const filtered =
		activeTab === 'All'
			? RESERVATIONS
			: RESERVATIONS.filter((r) => r.status === activeTab);

	return (
		<div className='flex flex-col flex-1'>
			<PageHeader
				title='Reservations'
				subtitle='Manage your reservations and track bookings.'
			/>

			<div className='px-8 py-6 flex-1'>
				<div className='flex items-center justify-between mb-6'>
					<TabBar
						tabs={RESERVATION_TABS}
						active={activeTab}
						onChange={setActiveTab}
					/>
					<FilterButton />
				</div>

				{filtered.length === 0 ? (
					<EmptyState
						message='Create your first listing to start getting booked'
						href='/host/dashboard/listings/create'
						label='Create listing'
					/>
				) : (
					<div className='space-y-4'>
						{filtered.map((res) => (
							<Link
								key={res.slug}
								href={`/host/dashboard/reservations/${res.slug}`}
								className='block'>
								<ReservationCard reservation={res} />
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
