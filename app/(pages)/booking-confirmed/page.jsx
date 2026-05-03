import Link from 'next/link';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';

const NEXT_STEPS = [
	{
		title: 'Your driver will be assigned 24 hours before you land.',
		desc: "You'll receive their details and contact number directly.",
	},
	{
		title: 'Check-in details will be sent to your mail.',
		desc: 'Including access codes, arrival instructions, and property info.',
	},
	{
		title: 'Your balance of $86 is due 72 hours before arrival.',
		desc: "We'll send a payment reminder to your email ahead of time.",
	},
];

export default function BookingConfirmedPage() {
	return (
		<>
			<Navbar />

			<main className='max-w-2xl mx-auto px-6 py-16'>
				<div className='flex items-center gap-3 mb-8'>
					<div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center'>
						<svg
							className='w-5 h-5 text-green-600'
							fill='none'
							stroke='currentColor'
							strokeWidth={2.5}
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M5 13l4 4L19 7'
							/>
						</svg>
					</div>
					<span className='text-sm font-medium text-neutral-700'>
						Your booking is confirmed
					</span>
				</div>

				<div className='flex items-start justify-between mb-8'>
					<h1 className='text-2xl font-semibold text-neutral-900'>
						You&apos;re all set, Adaeze
					</h1>
					<button className='flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900'>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							strokeWidth={1.5}
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z'
							/>
						</svg>
						Share
					</button>
				</div>

				<div className='flex items-center gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200 mb-8'>
					<svg
						className='w-6 h-6 text-neutral-500 flex-shrink-0'
						fill='none'
						stroke='currentColor'
						strokeWidth={1.5}
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
						/>
					</svg>
					<div>
						<p className='text-xs text-neutral-500 mb-0.5'>
							Your booking reference
						</p>
						<p className='text-base font-semibold text-neutral-900'>
							BK-2026-001
						</p>
					</div>
				</div>

				<div className='mb-8'>
					<h2 className='text-sm font-semibold text-neutral-900 mb-5'>
						What happens next
					</h2>
					<div className='space-y-5'>
						{NEXT_STEPS.map((step, i) => (
							<div
								key={i}
								className='flex items-start gap-4'>
								<div className='w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 text-sm font-medium flex items-center justify-center flex-shrink-0 mt-0.5'>
									{i + 1}
								</div>
								<div>
									<p className='text-sm font-medium text-neutral-900'>
										{step.title}
									</p>
									<p className='text-sm text-neutral-500 mt-0.5'>{step.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<Link
					href='/trips'
					className='w-full block text-center bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-xl text-sm transition-colors'>
					View booking
				</Link>
			</main>

			<Footer />
		</>
	);
}
