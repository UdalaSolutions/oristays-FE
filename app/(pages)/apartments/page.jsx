'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/layout/Navbar';
import ApartmentCard from '@/app/components/ui/ApartmentCard';
import Footer from '../../components/layout/Footer';
import FilterModal from '@/app/components/modals/Filtermodal';
import LoginModal from '@/app/components/modals/Loginmodal';
import Pagination from '@/app/components/ui/Pagination';
import { useAuth } from '@/app/lib/useAuth';

const MOCK_APARTMENTS = Array.from({ length: 12 }, (_, i) => ({
	id: `apt-${i}`,
	slug: `modern-loft-apartment-${i}`,
	name: "Da'ville Apartment",
	guests: 2,
	bedrooms: 1,
	beds: 1,
	baths: 1,
	price: 70,
	rating: 4.9,
	tier: ['Standard', 'Premium', 'Luxury', 'Standard'][i % 4],
	image: '/images/apartment-placeholder.jpg',
}));

function ApartmentsContent() {
	const searchParams = useSearchParams();
	const { isLoggedIn, user, login, logout } = useAuth();
	const [filterOpen, setFilterOpen] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);
	const [activeFilters, setActiveFilters] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const destination = searchParams.get('destination');
	const hasResults = MOCK_APARTMENTS.length > 0;

	const resultsLabel =
		destination ?
			`12 apartments available for your dates`
		:	`Favorites in Lekki`;

	return (
		<>
			<Navbar
				variant='search'
				isLoggedIn={isLoggedIn}
				user={user}
				onSignupClick={() => setLoginOpen(true)}
				onLoginClick={() => setLoginOpen(true)}
				onLogout={logout}
				onFilterClick={() => setFilterOpen(true)}
			/>
			<main className='md:w-335 mx-auto px-6 py-12'>
				{!hasResults ?
					<div>
						<h1 className='text-2xl font-bold leading-9 text-black mb-2'>
							No matches found
						</h1>
						<p className='text-sm text-neutral-500 max-w-xs leading-relaxed'>
							No apartments match those dates and filters. Try a different
							location, adjust dates, or update your filters to see more options
						</p>
					</div>
				:	<>
						<h1 className='text-xl font-semibold text-neutral-900 mb-6'>
							{resultsLabel}
						</h1>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-5 mb-10'>
							{MOCK_APARTMENTS.map((apt) => (
								<ApartmentCard
									key={apt.id}
									apartment={apt}
								/>
							))}
						</div>

						<Pagination
							currentPage={currentPage}
							totalPages={5}
							onPageChange={setCurrentPage}
						/>
					</>
				}
			</main>

			<Footer />

			<FilterModal
				isOpen={filterOpen}
				onClose={() => setFilterOpen(false)}
				onApply={(filters) => setActiveFilters(filters)}
			/>

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

export default function ApartmentsPage() {
	return (
		<Suspense>
			<ApartmentsContent />
		</Suspense>
	);
}
