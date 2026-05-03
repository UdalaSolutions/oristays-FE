'use client';

import { useState } from 'react';

const FAQS = [
	{
		q: 'How do I book an apartment?',
		a: 'Browse our verified listings, select your dates and guests, then pay a 40% deposit to confirm your booking.',
	},
	{
		q: 'Can I get an airport pickup?',
		a: 'Yes. During checkout you can add an airport transfer. A named driver will meet you at arrivals.',
	},
	{
		q: 'What is the cancellation policy?',
		a: 'Free cancellation up to 72 hours before check-in. After that, a 50% cancellation fee applies.',
	},
	{
		q: 'When do I pay the remaining balance?',
		a: 'The remaining 60% is due 48 hours before your arrival. We send a reminder email ahead of time.',
	},
	{
		q: 'Are all apartments verified?',
		a: 'Yes. Every listing on Orí Stays is physically inspected and verified by our team before going live.',
	},
	{
		q: 'What support is available during my stay?',
		a: 'We provide 24/7 human support via WhatsApp and phone throughout your entire stay.',
	},
];

export function FAQSection() {
	const [open, setOpen] = useState(null);

	return (
		<section>
			<div className='max-w-335 mx-auto px-6'>
				<div className='flex flex-col md:flex-row gap-12 justify-between items-start'>
					<div className='md:w-48 shrink-0'>
						<h2 className='text-2xl font-semibold text-neutral-900'>FAQs</h2>
					</div>
					<div className='flex-1 flex flex-col gap-2 max-w-180'>
						{FAQS.map((faq, i) => (
							<div
								key={i}
								className='border border-[#F4F4F4] rounded-xl px-5'>
								<button
									onClick={() => setOpen(open === i ? null : i)}
									className='w-full flex items-center justify-between py-4 text-left text-sm font-medium text-neutral-900 hover:text-primary transition-colors '>
									{faq.q}
									<svg
										className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform ${open === i ? 'rotate-45' : ''}`}
										fill='none'
										stroke='currentColor'
										strokeWidth={1.5}
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M12 4.5v15m7.5-7.5h-15'
										/>
									</svg>
								</button>
								{open === i && (
									<p className='pb-4 text-sm text-neutral-500 leading-relaxed'>
										{faq.a}
									</p>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
