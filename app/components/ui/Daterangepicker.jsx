'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const FLEX_DURATIONS = [1, 2, 3, 7, 14];

function getDaysInMonth(year, month) {
	return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
	const day = new Date(year, month, 1).getDay();
	return day === 0 ? 6 : day - 1;
}

function isSameDay(a, b) {
	if (!a || !b) return false;
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

function isBetween(date, start, end) {
	if (!start || !end) return false;
	const d = date.getTime();
	return d > Math.min(start.getTime(), end.getTime()) && d < Math.max(start.getTime(), end.getTime());
}

function isToday(date) {
	return isSameDay(date, new Date());
}

function MonthCalendar({ year, month, checkIn, checkOut, hoverDate, onSelect, onHover }) {
	const totalDays = getDaysInMonth(year, month);
	const firstDay = getFirstDayOfMonth(year, month);
	const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'long' });

	const cells = [];
	for (let i = 0; i < firstDay; i++) cells.push(null);
	for (let d = 1; d <= totalDays; d++) cells.push(new Date(year, month, d));

	const rangeEnd = checkOut || hoverDate;

	return (
		<div className='flex-1 min-w-0'>
			<p className='text-center text-sm font-semibold text-neutral-800 mb-4'>
				{monthName} {year}
			</p>
			<div className='grid grid-cols-7 mb-1'>
				{DAYS.map((d) => (
					<div key={d} className='text-center text-xs text-neutral-400 font-medium py-1'>
						{d}
					</div>
				))}
			</div>
			<div className='grid grid-cols-7'>
				{cells.map((date, i) => {
					if (!date) return <div key={`e-${i}`} style={{ height: 38 }} />;

					const isStart = isSameDay(date, checkIn);
					const isEnd = checkOut ? isSameDay(date, checkOut) : false;
					const inRange = checkIn && rangeEnd && isBetween(date, checkIn, rangeEnd);
					const isHov = isSameDay(date, hoverDate) && checkIn && !checkOut;
					const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
					const todayDay = isToday(date) && !isStart && !isEnd;

					return (
						<div
							key={date.toISOString()}
							className={`flex items-center justify-center ${inRange ? 'bg-primary/10' : ''}`}
							style={{ height: 38 }}>
							<button
								onClick={() => !isPast && onSelect(date)}
								onMouseEnter={() => !isPast && onHover(date)}
								onMouseLeave={() => onHover(null)}
								disabled={isPast}
								className={`
									w-9 h-9 flex items-center justify-center text-sm transition-colors rounded-full select-none
									${isStart || isEnd ? 'bg-brand-dark text-white font-semibold' : ''}
									${isHov ? 'bg-neutral-200 text-neutral-900' : ''}
									${!isStart && !isEnd && !isHov ? 'text-neutral-800' : ''}
									${!isStart && !isEnd && !isHov && !isPast ? 'hover:bg-neutral-100' : ''}
									${isPast ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
									${todayDay ? 'font-semibold underline' : ''}
								`}>
								{String(date.getDate()).padStart(2, '0')}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default function DateRangePicker({ onDatesChange, onClose }) {
	const today = new Date();
	const [mode, setMode] = useState('dates');
	const [leftMonth, setLeftMonth] = useState({ year: today.getFullYear(), month: today.getMonth() });
	const [checkIn, setCheckIn] = useState(null);
	const [checkOut, setCheckOut] = useState(null);
	const [hoverDate, setHoverDate] = useState(null);
	const [exactOnly, setExactOnly] = useState(true);

	const rightMonth =
		leftMonth.month === 11
			? { year: leftMonth.year + 1, month: 0 }
			: { year: leftMonth.year, month: leftMonth.month + 1 };

	function handlePrev() {
		setLeftMonth((prev) =>
			prev.month === 0 ? { year: prev.year - 1, month: 11 } : { year: prev.year, month: prev.month - 1 }
		);
	}

	function handleNext() {
		setLeftMonth((prev) =>
			prev.month === 11 ? { year: prev.year + 1, month: 0 } : { year: prev.year, month: prev.month + 1 }
		);
	}

	function handleSelect(date) {
		if (!checkIn || (checkIn && checkOut)) {
			setCheckIn(date);
			setCheckOut(null);
			onDatesChange?.({ checkIn: date, checkOut: null });
		} else {
			if (date < checkIn) {
				setCheckIn(date);
				setCheckOut(null);
				onDatesChange?.({ checkIn: date, checkOut: null });
			} else {
				setCheckOut(date);
				onDatesChange?.({ checkIn, checkOut: date });
			}
		}
	}

	function handleFlexDays(days) {
		if (!checkIn) return;
		const end = new Date(checkIn);
		end.setDate(end.getDate() + days);
		setCheckOut(end);
		setExactOnly(false);
		onDatesChange?.({ checkIn, checkOut: end });
	}

	function handleClear() {
		setCheckIn(null);
		setCheckOut(null);
		setHoverDate(null);
		setExactOnly(true);
		onDatesChange?.({ checkIn: null, checkOut: null });
	}

	const sharedProps = { checkIn, checkOut, hoverDate, onSelect: handleSelect, onHover: setHoverDate };

	return (
		<div className='bg-white rounded-2xl shadow-dropdown border border-neutral-100 p-5 w-[560px] max-w-[calc(100vw-48px)]'>
			<div className='flex items-center justify-center gap-1 mb-5'>
				{[
					{ id: 'dates', label: 'Dates' },
					{ id: 'flexible', label: "I'm flexible" },
				].map(({ id, label }) => (
					<button
						key={id}
						onClick={() => setMode(id)}
						className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
							mode === id ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100'
						}`}>
						{label}
					</button>
				))}
			</div>

			{mode === 'dates' ? (
				<>
					<div className='flex items-start gap-2'>
						<button
							onClick={handlePrev}
							className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors shrink-0 mt-0.5'>
							<ChevronLeft size={16} className='text-neutral-600' />
						</button>

						<div className='flex flex-1 gap-6'>
							<MonthCalendar {...leftMonth} {...sharedProps} />
							<div className='w-px bg-neutral-100 shrink-0' />
							<MonthCalendar {...rightMonth} {...sharedProps} />
						</div>

						<button
							onClick={handleNext}
							className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors shrink-0 mt-0.5'>
							<ChevronRight size={16} className='text-neutral-600' />
						</button>
					</div>

					<div className='flex items-center gap-2 mt-4 pt-4 border-t border-neutral-100 flex-wrap'>
						<button
							onClick={() => { handleClear(); setExactOnly(true); }}
							className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
								exactOnly
									? 'border-neutral-900 bg-neutral-900 text-white'
									: 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
							}`}>
							Exact dates
						</button>
						{FLEX_DURATIONS.map((d) => (
							<button
								key={d}
								onClick={() => { handleFlexDays(d); setExactOnly(false); }}
								className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
									!exactOnly && checkOut && checkIn &&
									Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24)) === d
										? 'border-neutral-900 bg-neutral-900 text-white'
										: 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
								}`}>
								+{d} day{d > 1 ? 's' : ''}
							</button>
						))}

						{(checkIn || checkOut) && (
							<button
								onClick={handleClear}
								className='ml-auto text-xs text-neutral-500 underline hover:text-neutral-800 transition-colors'>
								Clear
							</button>
						)}
					</div>
				</>
			) : (
				<div className='text-center py-10 text-sm text-neutral-400'>
					Flexible dates coming soon
				</div>
			)}
		</div>
	);
}
