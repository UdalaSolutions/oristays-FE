import RadioCard from '@/app/components/host/RadioCard';
import { METHOD_OPTIONS } from '@/app/lib/data/listings';

export default function StepMethod({ selected, onSelect }) {
	return (
		<div className='max-w-lg'>
			<h2 className='text-xl font-bold text-neutral-900 mb-6'>Create a new listing</h2>
			<div className='space-y-3'>
				{METHOD_OPTIONS.map((opt) => (
					<RadioCard
						key={opt.value}
						option={opt}
						selected={selected}
						onSelect={onSelect}
					/>
				))}
			</div>
		</div>
	);
}
