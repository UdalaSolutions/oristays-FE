import Link from 'next/link';

const FOOTER_LINKS = {
	Explore: [
		{ label: 'Apartments', href: '/apartments' },
		{ label: 'Ride Services', href: '/car-ride' },
		{ label: 'Trip Itinerary', href: '/trips' },
	],
	Company: [
		{ label: 'About Us', href: '/about' },
		{ label: 'List your property', href: '/list-property' },
	],
	Support: [
		{ label: 'Help Center', href: '/help' },
		{ label: 'WhatsApp us', href: 'https://wa.me/', external: true },
		{ label: 'FAQs', href: '/faqs' },
	],
};

const SOCIAL_ICONS = [
	{
		label: 'Facebook',
		href: '#',
		path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
	},
	{
		label: 'Twitter',
		href: '#',
		path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
	},
	{
		label: 'Instagram',
		href: '#',
		path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z',
	},
	{
		label: 'LinkedIn',
		href: '#',
		path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
	},
];

export default function Footer() {
	return (
		<footer className='bg-brand-dark text-white'>
			<div className='max-w-335 mx-auto px-6 py-16'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
					<div>
						<p className='text-lg font-bold mb-1'>Orí Stays</p>
						<p className='text-neutral-400 text-xs mb-4'>
							Land. Ride. Check In. Stay. Belong.
						</p>
						<p className='text-neutral-400 text-sm leading-relaxed'>
							Africa&apos;s first fully managed arrival-to-stay hospitality
							platform. Built in Lagos, for the world.
						</p>
					</div>

					{Object.entries(FOOTER_LINKS).map(([section, links]) => (
						<div key={section}>
							<p className='text-neutral-400 text-sm mb-4'>{section}</p>
							<ul className='space-y-3'>
								{links.map((link) => (
									<li key={link.label}>
										{link.external ?
											<a
												href={link.href}
												target='_blank'
												rel='noopener noreferrer'
												className='text-sm text-white hover:text-neutral-300 transition-colors'>
												{link.label}
											</a>
										:	<Link
												href={link.href}
												className='text-sm text-white hover:text-neutral-300 transition-colors'>
												{link.label}
											</Link>
										}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className='mt-16 pt-6 border-t border-neutral-700 flex flex-col md:flex-row items-center justify-between gap-4'>
					<div className='flex items-center gap-6'>
						<Link
							href='/terms'
							className='text-xs text-neutral-500 hover:text-neutral-300 transition-colors'>
							Terms of Service
						</Link>
						<Link
							href='/privacy'
							className='text-xs text-neutral-500 hover:text-neutral-300 transition-colors'>
							Privacy Policy
						</Link>
					</div>

					<p className='text-xs text-neutral-500 order-last md:order-none'>
						© 2026 Orí Stays. All rights reserved.
					</p>

					<div className='flex items-center gap-3'>
						{SOCIAL_ICONS.map((icon) => (
							<a
								key={icon.label}
								href={icon.href}
								aria-label={icon.label}
								className='w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary-hover transition-colors'>
								<svg
									className='w-4 h-4 text-white'
									fill='none'
									stroke='currentColor'
									strokeWidth={1.5}
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d={icon.path}
									/>
								</svg>
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
