'use client';

import { ChevronDown, Plus } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import CounterRow from '@/app/components/host/CounterRow';
import { PROPERTY_TYPES } from '@/app/lib/data/listings';

export default function StepSetupUnits({ units, onAdd, onDelete, onUpdate, onToggleExpanded }) {
	return (
		<div className='max-w-lg'>
			<p className='text-xs font-medium text-neutral-500 mb-1'>Step 2/8</p>
			<h2 className='text-xl font-bold text-neutral-900 mb-6'>Setup your units</h2>

			<div className='space-y-2'>
				{units.map((unit, index) => (
					<UnitAccordion
						key={unit.id}
						unit={unit}
						index={index}
						canDelete={units.length > 1}
						onDelete={() => onDelete(unit.id)}
						onChange={(field, value) => onUpdate(unit.id, field, value)}
						onToggle={() => onToggleExpanded(unit.id)}
					/>
				))}
			</div>

			<button
				type='button'
				onClick={onAdd}
				className='mt-6 flex items-center gap-2 text-sm font-semibold text-primary border border-primary px-4 py-2.5 rounded-xl hover:bg-primary-light transition-colors'>
				<Plus size={16} strokeWidth={2} />
				Add unit
			</button>
		</div>
	);
}

function UnitAccordion({ unit, index, canDelete, onDelete, onChange, onToggle }) {
	return (
		<div className='border-b border-neutral-100 pb-2'>
			<button
				type='button'
				onClick={onToggle}
				className='w-full flex items-center justify-between py-3'>
				<p className='text-base font-bold text-neutral-900'>Unit {index + 1}</p>
				<div className='flex items-center gap-3'>
					{canDelete && (
						<span
							role='button'
							onClick={(e) => {
								e.stopPropagation();
								onDelete();
							}}
							className='text-sm font-medium text-primary'>
							Delete
						</span>
					)}
					{unit.expanded ? (
						<ChevronUp size={18} strokeWidth={1.5} className='text-neutral-400' />
					) : (
						<ChevronDown size={18} strokeWidth={1.5} className='text-neutral-400' />
					)}
				</div>
			</button>

			{unit.expanded && (
				<div className='space-y-4 pb-4'>
					<div>
						<label className='block text-sm text-neutral-600 mb-2'>Property name</label>
						<input
							type='text'
							placeholder='Add a fun and catchy name'
							value={unit.name}
							onChange={(e) => onChange('name', e.target.value)}
							className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm text-neutral-600 mb-2'>Property type</label>
						<div className='relative'>
							<select
								value={unit.type}
								onChange={(e) => onChange('type', e.target.value)}
								className='w-full appearance-none border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary bg-white pr-10 cursor-pointer'>
								<option value=''>Select option</option>
								{PROPERTY_TYPES.map((t) => (
									<option key={t} value={t}>
										{t}
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
							value={unit.description}
							onChange={(e) => onChange('description', e.target.value)}
							rows={4}
							className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none'
						/>
					</div>

					<div className='pt-1'>
						<CounterRow
							label='How many guests can stay here?'
							value={unit.guests}
							onChange={(v) => onChange('guests', v)}
						/>
						<CounterRow
							label='Bedrooms'
							value={unit.bedrooms}
							onChange={(v) => onChange('bedrooms', v)}
						/>
						<CounterRow
							label='Beds'
							value={unit.beds}
							onChange={(v) => onChange('beds', v)}
						/>
						<CounterRow
							label='Bathrooms'
							value={unit.bathrooms}
							onChange={(v) => onChange('bathrooms', v)}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
