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
			<div className='h-18 max-w-1340 mx-auto px-6 py-4 flex items-center justify-between divide-x divide-neutral-700'>
				{STATS.map((stat) => {
					const Icon = stat.icon;
					return (
						<div
							key={stat.label}
							className='flex flex-1 items-center justify-center gap-2 px-4'>
							<Icon
								size={16}
								strokeWidth={1.5}
								className='text-neutral-400 shrink-0'
							/>
							<span className='text-[#F7F7F7] text-sm leading-5.5'>
								{stat.label}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
