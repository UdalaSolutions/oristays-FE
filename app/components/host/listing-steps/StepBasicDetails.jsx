'use client';

import { ChevronDown } from 'lucide-react';
import CounterRow from '@/app/components/host/CounterRow';
import { PROPERTY_TYPES } from '@/app/lib/data/listings';

export default function StepBasicDetails({
	propertyName,
	setPropertyName,
	propertyType,
	setPropertyType,
	propertyDescription,
	setPropertyDescription,
	guests,
	setGuests,
	bedrooms,
	setBedrooms,
	beds,
	setBeds,
	bathrooms,
	setBathrooms,
}) {
	return (
		<div className='max-w-lg'>
			<p className='text-xs font-medium text-neutral-500 mb-1'>Step 2/8</p>
			<h2 className='text-xl font-bold text-neutral-900 mb-8'>Basic details</h2>

			<div className='space-y-5'>
				<div>
					<label className='block text-sm text-neutral-600 mb-2'>Property name</label>
					<input
						type='text'
						placeholder='Add a fun and catchy name'
						value={propertyName}
						onChange={(e) => setPropertyName(e.target.value)}
						className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
					/>
				</div>

				<div>
					<label className='block text-sm text-neutral-600 mb-2'>Property type</label>
					<div className='relative'>
						<select
							value={propertyType}
							onChange={(e) => setPropertyType(e.target.value)}
							className='w-full appearance-none border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary bg-white pr-10 cursor-pointer'>
							<option value=''>Select option</option>
							{PROPERTY_TYPES.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
						<ChevronDown
							size={16}
							strokeWidth={1.5}
							className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none'
						/>
					</div>
				</div>

				<div>
					<label className='block text-sm text-neutral-600 mb-2'>
						Property description
					</label>
					<textarea
						placeholder='Describe what makes your property unique, what guests should expect...'
						value={propertyDescription}
						onChange={(e) => setPropertyDescription(e.target.value)}
						rows={4}
						className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none'
					/>
				</div>

				<div className='pt-2'>
					<CounterRow
						label='How many guests can stay here?'
						value={guests}
						onChange={setGuests}
					/>
					<CounterRow label='Bedrooms' value={bedrooms} onChange={setBedrooms} />
					<CounterRow label='Beds' value={beds} onChange={setBeds} />
					<CounterRow label='Bathrooms' value={bathrooms} onChange={setBathrooms} />
				</div>
			</div>
		</div>
	);
}
