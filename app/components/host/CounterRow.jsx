import { Minus, Plus } from 'lucide-react';

export default function CounterRow({ label, value, onChange }) {
	return (
		<div className='flex items-center justify-between py-4 border-b border-neutral-100 last:border-0'>
			<p className='text-sm text-neutral-800'>{label}</p>
			<div className='flex items-center gap-6'>
				<button
					type='button'
					onClick={() => onChange(Math.max(0, value - 1))}
					className='w-7 h-7 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-500 hover:border-neutral-500 hover:text-neutral-800 transition-colors'>
					<Minus size={13} strokeWidth={2} />
				</button>
				<span className='text-sm font-medium text-neutral-900 w-4 text-center'>
					{value}
				</span>
				<button
					type='button'
					onClick={() => onChange(value + 1)}
					className='w-7 h-7 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-500 hover:border-neutral-500 hover:text-neutral-800 transition-colors'>
					<Plus size={13} strokeWidth={2} />
				</button>
			</div>
		</div>
	);
}
