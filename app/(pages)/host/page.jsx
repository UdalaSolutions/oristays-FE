'use client';

import Link from 'next/link';

export default function HostLandingPage() {
	return (
		<div className='min-h-screen flex'>
			{/* Left panel */}
			<div className='flex-1 flex flex-col justify-center px-16 py-16'>
				<p className='text-primary font-bold text-lg mb-10'>Orí Stays</p>
				<h1 className='text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-6 max-w-lg'>
					List your space and connect with guests looking for their next stay
				</h1>
				<p className='text-neutral-600 text-sm leading-relaxed mb-10 max-w-sm'>
					Get discovered by travelers, fill your availability, and manage
					everything from one simple dashboard.
				</p>
				<Link
					href='/host/register'
					className='bg-primary hover:bg-primary-hover text-white font-semibold px-10 py-3.5 rounded-xl text-sm transition-colors w-fit'>
					Start hosting
				</Link>
			</div>

			{/* Right panel - full-height image */}
			<div className='w-2/4 max-h-screen flex-shrink-0 overflow-hidden'>
				<img
					src='/images/hostLanding.svg'
					alt='Beautiful space to host'
					className='w-full h-full object-cover'
				/>
			</div>
		</div>
	);
}
