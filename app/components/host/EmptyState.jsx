import Link from 'next/link';
import { Home, Plus } from 'lucide-react';

export default function EmptyState({ message, href, label }) {
	return (
		<div className='flex flex-col items-center justify-center py-24 text-center'>
			<Home size={64} strokeWidth={1} className='text-neutral-300' />
			<p className='text-sm font-medium text-neutral-700 mb-5 mt-4'>{message}</p>
			<Link
				href={href}
				className='flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors'>
				<Plus size={16} strokeWidth={2} />
				{label}
			</Link>
		</div>
	);
}
