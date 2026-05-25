export default function StepLocation({ address, setAddress, unitNumber, setUnitNumber }) {
	return (
		<div className='max-w-lg'>
			<p className='text-xs font-medium text-neutral-500 mb-1'>Step 1/8</p>
			<h2 className='text-xl font-bold text-neutral-900 mb-8'>
				Where is your property located?
			</h2>

			<div className='space-y-5'>
				<div>
					<label className='block text-sm text-neutral-600 mb-2'>
						Property address
					</label>
					<input
						type='text'
						placeholder='Enter property address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
					/>
				</div>

				<div>
					<label className='block text-sm text-neutral-600 mb-2'>
						Building, floor or unit number{' '}
						<span className='text-neutral-400'>(optional)</span>
					</label>
					<input
						type='text'
						placeholder='Enter number'
						value={unitNumber}
						onChange={(e) => setUnitNumber(e.target.value)}
						className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
					/>
				</div>

				<div>
					<p className='text-sm text-neutral-600 mb-2'>Drag pin to correct location</p>
					<div className='rounded-xl overflow-hidden border border-neutral-200 h-56'>
						<iframe
							src='https://www.openstreetmap.org/export/embed.html?bbox=3.0%2C6.35%2C3.6%2C6.65&layer=mapnik&marker=6.5243%2C3.3792'
							className='w-full h-full'
							title='Property location map'
						/>
					</div>
					<p className='text-xs text-neutral-400 mt-2'>
						Your address is only shared with guests after they&apos;ve made a reservation.
					</p>
				</div>
			</div>
		</div>
	);
}
