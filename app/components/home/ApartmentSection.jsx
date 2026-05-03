'use client';

import { useState } from 'react';
import ApartmentCard from '../ui/ApartmentCard';
import Link from 'next/link';

export function ApartmentSection({ title, apartments, viewAllHref }) {
	return (
		<section>
			<div className='flex items-center justify-between mb-5'>
				<h2 className='text-2xl font-bold text-[#262626]'>{title}</h2>
				{viewAllHref && (
					<Link
						href={viewAllHref}
						className='text-sm font-medium text-primary hover:text-primary-hover flex items-center gap-1'>
						View all
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							strokeWidth={1.5}
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
							/>
						</svg>
					</Link>
				)}
			</div>
			<div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
				{apartments.map((apt) => (
					<ApartmentCard
						key={apt.id}
						apartment={apt}
					/>
				))}
			</div>
		</section>
	);
}
