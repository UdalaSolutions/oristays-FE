'use client';

import { ChevronDown } from 'lucide-react';
import { HOUSE_RULES, TIME_OPTIONS } from '@/app/lib/data/listings';

export default function StepHouseRules({
	rules,
	onToggleRule,
	checkInTime,
	setCheckInTime,
	checkOutTime,
	setCheckOutTime,
	quietHoursFrom,
	setQuietHoursFrom,
	quietHoursTo,
	setQuietHoursTo,
}) {
	return (
		<div className='max-w-lg'>
			<p className='text-xs font-medium text-neutral-500 mb-1'>Step 5/8</p>
			<h2 className='text-xl font-bold text-neutral-900 mb-8'>House rules</h2>

			<div className='space-y-3 mb-8'>
				{HOUSE_RULES.map((rule) => (
					<ToggleRow
						key={rule.id}
						label={rule.label}
						value={rules[rule.id]}
						onChange={(val) => onToggleRule(rule.id, val)}
					/>
				))}
			</div>

			<div className='mb-8'>
				<div className='grid grid-cols-2 gap-4 mb-1'>
					<p className='text-sm font-medium text-neutral-800'>Check-in</p>
					<p className='text-sm font-medium text-neutral-800'>Check-out</p>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<TimeSelect value={checkInTime} onChange={setCheckInTime} />
					<TimeSelect value={checkOutTime} onChange={setCheckOutTime} />
				</div>
			</div>

			<div>
				<p className='text-sm font-medium text-neutral-800 mb-3'>Quiet hours</p>
				<div className='grid grid-cols-2 gap-4 mb-1'>
					<p className='text-sm text-neutral-500'>From</p>
					<p className='text-sm text-neutral-500'>To</p>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<TimeSelect value={quietHoursFrom} onChange={setQuietHoursFrom} />
					<TimeSelect value={quietHoursTo} onChange={setQuietHoursTo} />
				</div>
			</div>
		</div>
	);
}

function ToggleRow({ label, value, onChange }) {
	return (
		<div className='flex items-center justify-between px-4 py-4 border border-neutral-200 rounded-xl'>
			<span className='text-sm text-neutral-800'>{label}</span>
			<button
				type='button'
				role='switch'
				aria-checked={value}
				onClick={() => onChange(!value)}
				className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
					value ? 'bg-primary' : 'bg-neutral-300'
				}`}>
				<span
					className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
						value ? 'translate-x-5' : 'translate-x-0'
					}`}
				/>
			</button>
		</div>
	);
}

function TimeSelect({ value, onChange }) {
	return (
		<div className='relative'>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className='w-full appearance-none border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary bg-white pr-10 cursor-pointer'>
				{TIME_OPTIONS.map((t) => (
					<option key={t}>{t}</option>
				))}
			</select>
			<ChevronDown
				size={16}
				strokeWidth={1.5}
				className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none'
			/>
		</div>
	);
}
