'use client';

const PLATFORM_FEE_RATE = 0.15;

export default function StepSetPrice({ price, setPrice }) {
	const fee = price * PLATFORM_FEE_RATE;
	const earnings = price - fee;

	function handleChange(e) {
		const val = parseInt(e.target.value, 10);
		setPrice(isNaN(val) || val < 0 ? 0 : val);
	}

	return (
		<div className='max-w-lg'>
			<p className='text-xs font-medium text-neutral-500 mb-1'>Step 7/8</p>
			<h2 className='text-xl font-bold text-neutral-900 mb-2'>Set your price</h2>
			<p className='text-sm text-neutral-400 mb-8'>
				Listings similar to yours have a price range between $10 – $40
			</p>

			<div className='flex items-baseline gap-1 mb-8'>
				<span className='text-3xl font-bold text-neutral-900'>$</span>
				<input
					type='number'
					min='0'
					value={price || ''}
					placeholder='0'
					onChange={handleChange}
					className='text-6xl font-bold text-neutral-900 bg-transparent border-none outline-none w-36 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
				/>
			</div>

			<div className='space-y-3'>
				<div className='flex items-center justify-between'>
					<p className='text-sm text-neutral-600'>15% Ori Stays fee</p>
					<p className='text-sm font-bold text-neutral-900'>${fee.toFixed(2)}</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-sm text-neutral-600'>You earn</p>
					<p className='text-sm font-bold text-neutral-900'>${earnings.toFixed(2)}</p>
				</div>
			</div>
		</div>
	);
}
