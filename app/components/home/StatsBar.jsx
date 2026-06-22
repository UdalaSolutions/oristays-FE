import { Building2, UserCheck, Headphones, DollarSign } from 'lucide-react';

const STATS = [
	{ icon: Building2, label: '40 Verified apartments' },
	{ icon: UserCheck, label: 'Named drivers, every arrival' },
	{ icon: Headphones, label: '24/7 human support' },
	{ icon: DollarSign, label: 'Fixed USD pricing' },
];

export function StatsBar() {
	return (
		<div className='bg-brand-dark text-white'>
			<div className='max-w-1340 mx-auto px-6 py-5 md:py-0 grid grid-cols-2 gap-y-4 gap-x-2 md:flex md:h-18 md:items-center md:justify-between md:gap-0 md:divide-x md:divide-neutral-700'>
				{STATS.map((stat) => {
					const Icon = stat.icon;
					return (
						<div key={stat.label} className='flex items-center gap-2 md:flex-1 md:justify-center md:px-4'>
							<Icon size={16} strokeWidth={1.5} className='text-neutral-400 shrink-0' />
							<span className='text-[#F7F7F7] text-sm leading-5.5'>{stat.label}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
