'use client';

import { Bell } from 'lucide-react';

export default function PageHeader({ title, subtitle }) {
	return (
		<div className='flex items-start justify-between px-8 pt-8 pb-6 border-b border-neutral-100'>
			<div>
				<h1 className='text-xl font-bold text-neutral-900'>{title}</h1>
				{subtitle && (
					<p className='text-sm text-neutral-500 mt-0.5'>{subtitle}</p>
				)}
			</div>
			<button className='p-1.5 text-neutral-400 hover:text-neutral-700 transition-colors'>
				<Bell size={20} strokeWidth={1.5} />
			</button>
		</div>
	);
}
