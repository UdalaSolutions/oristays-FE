import Footer from '@/app/components/layout/Footer';
import Navbar from '@/app/components/layout/Navbar';

const VALUES = [
	{
		icon: '🏆',
		title: 'Premium without arrogance',
		desc: "Quality that doesn't make you feel like a transaction.",
	},
	{
		icon: '🤝',
		title: 'Warm & genuine',
		desc: "Quality that doesn't make you feel like a transaction.",
	},
	{
		icon: '⚡',
		title: 'Modern & frictionless',
		desc: "Quality that doesn't make you feel like a transaction.",
	},
	{
		icon: '🌍',
		title: 'Bold & African-proud',
		desc: "Quality that doesn't make you feel like a transaction.",
	},
];

export default function AboutPage() {
	return (
		<>
			<Navbar />

			<main>
				<section className='relative min-h-153 flex flex-col justify-center overflow-hidden'>
					<div className='absolute inset-0'>
						<img
							src='/images/about-hero.svg'
							alt='About Orí Stays'
							className='w-full h-full object-cover'
						/>
						<div className='absolute inset-0 bg-black/50' />
					</div>
					<div className='relative z-10 max-w-7xl mx-auto px-6 py-16 w-full'>
						<span className='inline-block border border-primary text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-6'>
							Our story
						</span>
						<h1 className='text-4xl md:text-5xl font-bold text-white leading-tight mb-6 max-w-xl'>
							Built in Lagos,
							<br />
							Built for trust.
						</h1>
						<p className='text-white/80 text-sm max-w-sm leading-relaxed'>
							Orí Stays was born from a simple frustration: why should arriving
							in Nigeria feel so uncertain? So, we built the platform we always
							wished existed.
						</p>
					</div>
				</section>

				<div className='max-w-335 mx-auto px-6 py-16 space-y-20'>
					<section className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
						<div>
							<h2 className='text-2xl font-semibold text-neutral-900 mb-4'>
								What &apos;Orí&apos; means
							</h2>
							<p className='text-sm text-neutral-600 leading-relaxed'>
								In Yoruba, Orí (OH-ree) refers to the inner guiding force — your
								head, your destiny, the spirit that orients you on your path.
								For a hospitality brand built on making travelers feel safe and
								purposefully cared for from the moment they land, Orí is not
								just a name. It is a mission statement.
							</p>
						</div>
						<div className='overflow-hidden'>
							<img
								src='/images/about-hotel.svg'
								alt='Hotel'
								className='w-full h-full object-cover'
							/>
						</div>
					</section>

					<section className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
						<div className='overflow-hidden  order-last md:order-first'>
							<img
								src='/images/about-sheraton.svg'
								alt='Sheraton Lagos'
								className='w-full h-full object-cover'
							/>
						</div>
						<div>
							<h2 className='text-2xl font-semibold text-neutral-900 mb-4'>
								Why we exist
							</h2>
							<p className='text-sm text-neutral-600 leading-relaxed'>
								Nigeria receives millions of international visitors annually —
								diaspora returnees, foreign executives, first-time travelers.
								Yet the experience of arriving and settling into accommodation
								remains fragmented, unpredictable, and anxiety-inducing.
								Unverified photos. Ghost hosts. No support when things go wrong.
								This is not a minor inconvenience — it is a systemic trust
								failure. And it is precisely the gap Orí Stays is built to
								close.
							</p>
						</div>
					</section>

					{/* <section>
						<h2 className='text-2xl font-semibold text-neutral-900 mb-10'>
							Our Values
						</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
							{VALUES.map((v) => (
								<div key={v.title}>
									<div className='text-3xl mb-4'>{v.icon}</div>
									<h3 className='text-sm font-semibold text-neutral-900 mb-2'>
										{v.title}
									</h3>
									<p className='text-sm text-neutral-500 leading-relaxed'>
										{v.desc}
									</p>
								</div>
							))}
						</div>
					</section> */}
				</div>
			</main>

			<Footer />
		</>
	);
}
