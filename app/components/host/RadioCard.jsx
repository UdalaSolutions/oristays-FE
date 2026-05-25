export default function RadioCard({ option, selected, onSelect }) {
	const isSelected = selected === option.value;

	return (
		<label
			className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
				isSelected
					? 'border-primary bg-primary-light/40'
					: 'border-neutral-200 hover:border-neutral-300 bg-white'
			}`}>
			<input
				type='radio'
				name='wizard-option'
				value={option.value}
				checked={isSelected}
				onChange={() => onSelect(option.value)}
				className='mt-0.5 accent-primary'
			/>
			<div>
				<p className='text-sm font-semibold text-neutral-900'>{option.label}</p>
				<p className='text-xs text-neutral-500 mt-0.5 leading-relaxed'>
					{option.description}
				</p>
			</div>
		</label>
	);
}
