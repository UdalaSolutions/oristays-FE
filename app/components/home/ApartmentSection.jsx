'use client';

import ApartmentCard from '../ui/ApartmentCard';
import Link from 'next/link';

export function ApartmentSection({ title, apartments, viewAllHref }) {
	return (
		<section>
			<div className='flex items-center justify-between mb-5'>
				<h2 className='text-xl md:text-2xl font-bold text-black'>{title}</h2>
				{viewAllHref && (
					<Link
						href={viewAllHref}
						className='text-sm font-medium text-primary hover:text-primary-hover flex items-center gap-1 shrink-0'>
						View all
						<svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
						</svg>
					</Link>
				)}
			</div>
			<div className='flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:pb-0 md:mx-0 md:px-0'>
				{apartments.map((apt) => (
					<div key={apt.id} className='min-w-[240px] md:min-w-0'>
						<ApartmentCard apartment={apt} />
					</div>
				))}
			</div>
		</section>
	);
}
