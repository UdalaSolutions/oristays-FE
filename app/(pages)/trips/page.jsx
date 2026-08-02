'use client';

import { useState } from 'react';
import Navbar from '@/app/components/layout/Navbar';
import LoginModal from '@/app/components/modals/Loginmodal';
import TripCard from '@/app/components/trips/TripCard';
import TripsEmptyState from '@/app/components/trips/TripsEmptyState';
import { useAuth } from '@/app/lib/useAuth';
import { TRIP_TABS, TRIP_CATEGORY, TRIPS } from '@/app/lib/data/trips';

function TripsTabs({ tabs, active, onChange }) {
	return (
		<div className='inline-flex items-center gap-1 bg-white rounded-full p-1.5 shadow-[0px_0px_24px_1px_#A0C2DF33] mb-8'>
			{tabs.map((tab) => (
				<button
					key={tab}
					onClick={() => onChange(tab)}
					className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
						active === tab
							? 'border-primary text-primary'
							: 'border-transparent text-neutral-700 hover:text-neutral-900'
					}`}>
					{tab}
				</button>
			))}
		</div>
	);
}

export default function TripsPage() {
	const { isLoggedIn, user, login, logout } = useAuth();
	const [loginOpen, setLoginOpen] = useState(false);
	const [tab, setTab] = useState('Active');

	const trips = TRIPS.filter((t) => t.category === TRIP_CATEGORY[tab]);

	return (
		<>
			<Navbar
				variant='minimal'
				isLoggedIn={isLoggedIn}
				user={user}
				onSignupClick={() => setLoginOpen(true)}
				onLoginClick={() => setLoginOpen(true)}
				onLogout={logout}
			/>

			<main className='max-w-335 mx-auto px-6 py-10 md:py-12 min-h-[75vh]'>
				<h1 className='text-3xl font-bold text-neutral-900 mb-6'>Trips</h1>

				<TripsTabs tabs={TRIP_TABS} active={tab} onChange={setTab} />

				{trips.length === 0 ? (
					<TripsEmptyState />
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{trips.map((trip) => (
							<TripCard key={trip.id} trip={trip} />
						))}
					</div>
				)}
			</main>

			<LoginModal
				isOpen={loginOpen}
				onClose={() => setLoginOpen(false)}
				onSuccess={(email) => {
					login(email);
					setLoginOpen(false);
				}}
			/>
		</>
	);
}
