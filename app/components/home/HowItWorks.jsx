const HOW_IT_WORKS = [
	{
		title: 'Browse verified apartments',
		desc: 'Every listing inspected by our team. What you see is what you get.',
	},
	{
		title: 'Add your airport pickup',
		desc: 'Schedule a reliable driver and enjoy a smooth ride your stay.',
	},
	{
		title: 'Pay a deposit, stay secure',
		desc: "Secure your booking with a deposit and stay assured it's confirmed.",
	},
	{
		title: 'Land, we handle the rest',
		desc: 'Arrive knowing everything is set for your stay.',
	},
];

const MD_INDENTS = ['', 'md:ml-[40px]', 'md:ml-[80px]', 'md:ml-[120px]'];

export function HowItWorks() {
	return (
		<section className='bg-brand-dark overflow-hidden'>
			<div className='max-w-335 mx-auto px-6 py-14'>
				<h2 className='text-[30px] font-bold text-white mb-10'>How Orí Stays works</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-0'>
					<div className='overflow-hidden rounded-2xl md:rounded-none'>
						<img
							src='/images/lagos-fountain.svg'
							alt='Lagos'
							className='w-full h-full object-cover'
						/>
					</div>
					<div className='space-y-6'>
						{HOW_IT_WORKS.map((step, i) => (
							<div key={i} className={`flex items-start gap-4 ${MD_INDENTS[i]}`}>
								<div className='w-12.5 h-12.5 rounded-full bg-primary/16 text-primary font-semibold flex items-center justify-center shrink-0 mt-0.5 border border-primary'>
									{i + 1}
								</div>
								<div>
									<p className='text-sm font-semibold text-white mb-1'>{step.title}</p>
									<p className='text-sm text-neutral-400'>{step.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
