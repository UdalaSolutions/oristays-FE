import { SlidersHorizontal } from 'lucide-react';

export default function FilterButton({ onClick }) {
	return (
		<button
			onClick={onClick}
			className='flex items-center gap-2 text-sm text-neutral-600 border border-neutral-200 px-4 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors'>
			<SlidersHorizontal size={16} strokeWidth={1.5} />
			Filter
		</button>
	);
}
