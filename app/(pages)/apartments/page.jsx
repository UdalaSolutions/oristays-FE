'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/layout/Navbar';
import ApartmentCard from '@/app/components/ui/ApartmentCard';
import Footer from '../../components/layout/Footer';
import FilterModal from '@/app/components/modals/Filtermodal';

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
	const [filterOpen, setFilterOpen] = useState(false);
	const [activeFilters, setActiveFilters] = useState(null);

	const destination = searchParams.get('destination');
	const hasResults = MOCK_APARTMENTS.length > 0;

	const resultsLabel =
		destination ?
			`12 apartments available for your dates`
		:	`Favorites in Lekki`;

	return (
		<>
			<Navbar />
			<main className='md:w-335 mx-auto px-6 py-12'>
				{!hasResults ?
					<div>
						<h1 className='text-xl font-semibold text-neutral-900 mb-2'>
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

						<div className='flex items-center justify-center gap-2'>
							<button className='w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:border-neutral-400'>
								<svg
									className='w-4 h-4'
									fill='none'
									stroke='currentColor'
									strokeWidth={1.5}
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15.75 19.5L8.25 12l7.5-7.5'
									/>
								</svg>
							</button>
							{[1, 2, 3, 4, 5].map((page) => (
								<button
									key={page}
									className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
										page === 1 ?
											'bg-neutral-900 text-white'
										:	'text-neutral-600 hover:bg-neutral-100'
									}`}>
									{page}
								</button>
							))}
							<button className='w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:border-neutral-400'>
								<svg
									className='w-4 h-4'
									fill='none'
									stroke='currentColor'
									strokeWidth={1.5}
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M8.25 4.5l7.5 7.5-7.5 7.5'
									/>
								</svg>
							</button>
						</div>
					</>
				}
			</main>

			<Footer />

			<FilterModal
				isOpen={filterOpen}
				onClose={() => setFilterOpen(false)}
				onApply={(filters) => setActiveFilters(filters)}
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
