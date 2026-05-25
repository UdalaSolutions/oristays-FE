'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { getListing } from '@/app/lib/data/listings';

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December',
];
const SHORT_MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const NOTICE_PERIOD_OPTIONS = [
	'Same day',
	'1 day before arrival',
	'2 days before arrival',
	'3 days before arrival',
	'1 week before arrival',
];
const PREPARATION_TIME_OPTIONS = ['None', '1 night', '2 nights'];

function getMonthCells(year, month) {
	const firstDow = new Date(year, month, 1).getDay();
	const offset = firstDow === 0 ? 6 : firstDow - 1;
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const cells = Array(offset).fill(null);
	for (let d = 1; d <= daysInMonth; d++) cells.push(d);
	return cells;
}

function formatDate(year, month, day) {
	return new Date(year, month, day).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
}

export default function CalendarPage() {
	const { id } = useParams();
	const router = useRouter();
	const listing = getListing(id);

	const today = new Date();

	const [startYear, setStartYear] = useState(today.getFullYear());
	const [startMonth, setStartMonth] = useState(today.getMonth());
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const [selectedDate, setSelectedDate] = useState(null);
	const [sidebarView, setSidebarView] = useState('default');

	const [pricePerNight, setPricePerNight] = useState(String(listing?.price ?? 25));
	const [minNights, setMinNights] = useState('1');
	const [maxNights, setMaxNights] = useState('30');
	const [noticePeriod, setNoticePeriod] = useState('Same day');
	const [prepTime, setPrepTime] = useState('None');
	const [dateAvailable, setDateAvailable] = useState(true);
	const [datePrice, setDatePrice] = useState(String(listing?.price ?? 25));

	const months = Array.from({ length: 6 }, (_, i) => {
		const d = new Date(startYear, startMonth + i, 1);
		return { year: d.getFullYear(), month: d.getMonth() };
	});

	const dropdownMonths = Array.from({ length: 12 }, (_, i) => {
		const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
		return { year: d.getFullYear(), month: d.getMonth() };
	});

	function handleDayClick(year, month, day) {
		const isSame =
			selectedDate?.year === year && selectedDate?.month === month && selectedDate?.day === day;
		if (isSame) {
			setSelectedDate(null);
			setSidebarView('default');
		} else {
			setSelectedDate({ year, month, day });
			setSidebarView('date');
		}
	}

	function jumpToMonth(year, month) {
		setStartYear(year);
		setStartMonth(month);
		setDropdownOpen(false);
	}

	const noticePeriodLabel =
		noticePeriod === 'Same day' ? 'Same day advance notice' : noticePeriod;

	return (
		<>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100'>
				<h1 className='text-xl font-bold text-neutral-900'>{listing?.title ?? 'Listing'}</h1>
			</div>

			<div className='flex flex-1 overflow-hidden'>
				<div className='flex-1 overflow-auto px-8 py-6'>
					<button
						onClick={() => router.back()}
						className='flex items-center gap-2 text-sm text-neutral-600 mb-5 hover:text-neutral-900 transition-colors'>
						<ArrowLeft size={16} strokeWidth={1.5} />
						Back
					</button>

					<div className='relative mb-4'>
						<button
							onClick={() => setDropdownOpen((v) => !v)}
							className='flex items-center gap-1.5 text-2xl font-bold text-neutral-900 hover:opacity-80 transition-opacity'>
							{MONTH_NAMES[months[0].month]}
							<ChevronDown size={20} strokeWidth={2} className='text-neutral-600' />
						</button>

						{dropdownOpen && (
							<div className='absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg z-10 p-2'>
								<div className='grid grid-cols-3 gap-1'>
									{dropdownMonths.map(({ year, month }) => {
										const isActive =
											months[0].year === year && months[0].month === month;
										return (
											<button
												key={`${year}-${month}`}
												onClick={() => jumpToMonth(year, month)}
												className={`px-3 py-2 text-sm rounded-lg transition-colors ${
													isActive
														? 'bg-primary text-white'
														: 'text-neutral-700 hover:bg-neutral-50'
												}`}>
												{SHORT_MONTH_NAMES[month]} {year}
											</button>
										);
									})}
								</div>
							</div>
						)}
					</div>

					<div className='grid grid-cols-7 gap-1 mb-3'>
						{DAY_NAMES.map((d) => (
							<div
								key={d}
								className='text-center text-sm text-neutral-400 py-1'>
								{d}
							</div>
						))}
					</div>

					{months.map(({ year, month }, idx) => {
						const cells = getMonthCells(year, month);
						return (
							<div
								key={`${year}-${month}`}
								className='mb-8'>
								{idx > 0 && (
									<h3 className='text-2xl font-bold text-neutral-900 mt-2 mb-3'>
										{MONTH_NAMES[month]}
									</h3>
								)}
								<div className='grid grid-cols-7 gap-1'>
									{cells.map((day, i) => {
										if (!day) return <div key={`e-${i}`} />;

										const isToday =
											today.getFullYear() === year &&
											today.getMonth() === month &&
											today.getDate() === day;
										const isSelected =
											selectedDate?.year === year &&
											selectedDate?.month === month &&
											selectedDate?.day === day;

										return (
											<button
												key={day}
												onClick={() => handleDayClick(year, month, day)}
												className={`aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-colors border ${
													isSelected
														? 'bg-primary text-white border-primary'
														: isToday
														? 'bg-brand-dark text-white border-brand-dark'
														: 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
												}`}>
												{day}
											</button>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>

				<div className='w-80 shrink-0 border-l border-neutral-100 flex flex-col'>
					{sidebarView === 'default' && (
						<div className='flex-1 px-6 py-8'>
							<button
								onClick={() => setSidebarView('price')}
								className='w-full flex items-center justify-between py-4 border-b border-neutral-100 text-left'>
								<div>
									<p className='text-sm font-bold text-neutral-900'>Price</p>
									<p className='text-sm text-neutral-400 mt-0.5'>${listing?.price ?? 25}</p>
								</div>
								<ChevronRight
									size={18}
									strokeWidth={1.5}
									className='text-neutral-400 shrink-0'
								/>
							</button>

							<button
								onClick={() => setSidebarView('availability')}
								className='w-full flex items-center justify-between py-4 text-left'>
								<div>
									<p className='text-sm font-bold text-neutral-900'>Availability settings</p>
									<p className='text-sm text-neutral-400 mt-0.5'>
										{minNights} – {maxNights} night stays
									</p>
									<p className='text-sm text-neutral-400'>{noticePeriodLabel}</p>
								</div>
								<ChevronRight
									size={18}
									strokeWidth={1.5}
									className='text-neutral-400 shrink-0'
								/>
							</button>
						</div>
					)}

					{sidebarView === 'price' && (
						<div className='flex-1 flex flex-col'>
							<div className='flex-1 px-6 py-6'>
								<button
									onClick={() => setSidebarView('default')}
									className='mb-5 text-neutral-600 hover:text-neutral-900 transition-colors'>
									<ChevronLeft size={20} strokeWidth={1.5} />
								</button>

								<p className='text-lg font-bold text-neutral-900 mb-2'>Price settings</p>
								<p className='text-sm text-neutral-400 mb-6'>
									This rate will apply to all nights unless customized for specific dates.
								</p>

								<div>
									<label className='block text-sm text-neutral-600 mb-2'>
										Price per night
									</label>
									<input
										type='text'
										value={`$${pricePerNight}`}
										onChange={(e) =>
											setPricePerNight(e.target.value.replace(/[^0-9]/g, ''))
										}
										className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									/>
								</div>
							</div>

							<div className='px-6 py-4 border-t border-neutral-100'>
								<button
									disabled
									className='w-full py-3 rounded-xl text-sm font-semibold bg-neutral-100 text-neutral-400 cursor-not-allowed'>
									Save
								</button>
							</div>
						</div>
					)}

					{sidebarView === 'availability' && (
						<div className='flex-1 flex flex-col'>
							<div className='flex-1 px-6 py-6 overflow-auto'>
								<button
									onClick={() => setSidebarView('default')}
									className='mb-5 text-neutral-600 hover:text-neutral-900 transition-colors'>
									<ChevronLeft size={20} strokeWidth={1.5} />
								</button>

								<p className='text-lg font-bold text-neutral-900 mb-2'>
									Availability settings
								</p>
								<p className='text-sm text-neutral-400 mb-6'>
									This will apply to all nights unless customized for specific dates.
								</p>

								<p className='text-sm font-bold text-neutral-900 mb-4'>Trip duration</p>

								<div className='mb-4'>
									<label className='block text-sm text-neutral-600 mb-2'>
										Minimum nights
									</label>
									<input
										type='number'
										min='1'
										value={minNights}
										onChange={(e) => setMinNights(e.target.value)}
										className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
									/>
								</div>

								<div className='mb-6'>
									<label className='block text-sm text-neutral-600 mb-2'>
										Maximum nights
									</label>
									<input
										type='number'
										min='1'
										value={maxNights}
										onChange={(e) => setMaxNights(e.target.value)}
										className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
									/>
								</div>

								<p className='text-sm font-bold text-neutral-900 mb-4'>
									Booking preferences
								</p>

								<div className='mb-4'>
									<label className='block text-sm text-neutral-600 mb-2'>
										Notice period
									</label>
									<div className='relative'>
										<select
											value={noticePeriod}
											onChange={(e) => setNoticePeriod(e.target.value)}
											className='w-full appearance-none border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary bg-white pr-10 cursor-pointer'>
											{NOTICE_PERIOD_OPTIONS.map((opt) => (
												<option key={opt} value={opt}>
													{opt}
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
										Preparation time
									</label>
									<div className='relative'>
										<select
											value={prepTime}
											onChange={(e) => setPrepTime(e.target.value)}
											className='w-full appearance-none border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary bg-white pr-10 cursor-pointer'>
											{PREPARATION_TIME_OPTIONS.map((opt) => (
												<option key={opt} value={opt}>
													{opt}
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
							</div>

							<div className='px-6 py-4 border-t border-neutral-100'>
								<button
									disabled
									className='w-full py-3 rounded-xl text-sm font-semibold bg-neutral-100 text-neutral-400 cursor-not-allowed'>
									Save
								</button>
							</div>
						</div>
					)}

					{sidebarView === 'date' && selectedDate && (
						<div className='flex-1 flex flex-col'>
							<div className='flex-1 px-6 py-6'>
								<p className='text-base font-bold text-neutral-900 mb-6'>
									{formatDate(selectedDate.year, selectedDate.month, selectedDate.day)}
								</p>

								<div className='flex items-center justify-between mb-5'>
									<p className='text-sm text-neutral-700'>Availability</p>
									<button
										onClick={() => setDateAvailable((v) => !v)}
										role='switch'
										aria-checked={dateAvailable}
										className={`relative w-11 h-6 rounded-full transition-colors ${
											dateAvailable ? 'bg-neutral-900' : 'bg-neutral-300'
										}`}>
										<span
											className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
												dateAvailable ? 'translate-x-5' : 'translate-x-0'
											}`}
										/>
									</button>
								</div>

								<div>
									<label className='block text-sm text-neutral-600 mb-2'>Price</label>
									<input
										type='text'
										value={`$${datePrice}`}
										onChange={(e) =>
											setDatePrice(e.target.value.replace(/[^0-9]/g, ''))
										}
										className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									/>
								</div>
							</div>

							<div className='px-6 py-4 border-t border-neutral-100'>
								<button
									disabled
									className='w-full py-3 rounded-xl text-sm font-semibold bg-neutral-100 text-neutral-400 cursor-not-allowed'>
									Save
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
