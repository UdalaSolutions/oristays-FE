import RadioCard from '@/app/components/host/RadioCard';
import { UNIT_OPTIONS } from '@/app/lib/data/listings';

export default function StepUnits({ selected, onSelect }) {
	return (
		<div className='max-w-lg'>
			<h2 className='text-xl font-bold text-neutral-900 mb-6'>
				How many units do you want to list?
			</h2>
			<div className='space-y-3'>
				{UNIT_OPTIONS.map((opt) => (
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
