'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
	const s = start.getTime();
	const e = end.getTime();
	return d > Math.min(s, e) && d < Math.max(s, e);
}

function isToday(date) {
	return isSameDay(date, new Date());
}

function MonthCalendar({
	year,
	month,
	checkIn,
	checkOut,
	hoverDate,
	onSelect,
	onHover,
}) {
	const totalDays = getDaysInMonth(year, month);
	const firstDay = getFirstDayOfMonth(year, month);
	const monthName = new Date(year, month, 1).toLocaleString('default', {
		month: 'long',
	});

	const cells = [];
	for (let i = 0; i < firstDay; i++) cells.push(null);
	for (let d = 1; d <= totalDays; d++) cells.push(new Date(year, month, d));

	const rangeEnd = checkOut || hoverDate;

	return (
		<div className='flex-1'>
			<p className='text-center text-sm font-semibold text-neutral-800 mb-4'>
				{monthName} {year}
			</p>
			<div className='grid grid-cols-7 mb-2'>
				{DAYS.map((d) => (
					<div
						key={d}
						className='text-center text-xs text-neutral-400 font-medium py-1'>
						{d}
					</div>
				))}
			</div>
			<div className='grid grid-cols-7'>
				{cells.map((date, i) => {
					if (!date) return <div key={`empty-${i}`} />;

					const isStart = isSameDay(date, checkIn);
					const isEnd = checkOut ? isSameDay(date, checkOut) : false;
					const inRange = checkIn && isBetween(date, checkIn, rangeEnd);
					const isHovered = isSameDay(date, hoverDate);
					const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

					let bgClass = '';
					let textClass = 'text-neutral-800';
					let roundClass = 'rounded-xl';

					if (isStart || isEnd) {
						bgClass = 'bg-brand-dark';
						textClass = 'text-white';
					} else if (inRange) {
						bgClass = 'bg-neutral-100';
						roundClass = 'rounded-none';
						textClass = 'text-neutral-800';
					} else if (isHovered && checkIn && !checkOut) {
						bgClass = 'bg-neutral-100';
						textClass = 'text-neutral-800';
					}

					if (isStart && (checkOut || hoverDate)) {
						roundClass = 'rounded-xl';
					}

					return (
						<div
							key={date.toISOString()}
							className={`relative flex items-center justify-center ${inRange ? bgClass : ''} ${inRange ? roundClass : ''}`}
							style={{ height: 40 }}>
							<button
								onClick={() => !isPast && onSelect(date)}
								onMouseEnter={() => onHover(date)}
								onMouseLeave={() => onHover(null)}
								disabled={isPast}
								className={`
									w-9 h-9 flex items-center justify-center text-sm transition-colors
									${isStart || isEnd ? `${bgClass} ${textClass} rounded-xl` : ''}
									${!isStart && !isEnd && isHovered ? 'bg-neutral-200 rounded-full' : ''}
									${!isStart && !isEnd && !isHovered ? textClass : ''}
									${isPast ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-neutral-200 hover:rounded-full'}
									${isToday(date) && !isStart && !isEnd ? 'font-semibold underline' : ''}
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

export default function DateRangePicker({ onDatesChange }) {
	const today = new Date();
	const [leftMonth, setLeftMonth] = useState({
		year: today.getFullYear(),
		month: today.getMonth(),
	});
	const [checkIn, setCheckIn] = useState(null);
	const [checkOut, setCheckOut] = useState(null);
	const [hoverDate, setHoverDate] = useState(null);

	const rightMonth =
		leftMonth.month === 11 ?
			{ year: leftMonth.year + 1, month: 0 }
		:	{ year: leftMonth.year, month: leftMonth.month + 1 };

	function handlePrev() {
		setLeftMonth((prev) =>
			prev.month === 0 ?
				{ year: prev.year - 1, month: 11 }
			:	{ year: prev.year, month: prev.month - 1 },
		);
	}

	function handleNext() {
		setLeftMonth((prev) =>
			prev.month === 11 ?
				{ year: prev.year + 1, month: 0 }
			:	{ year: prev.year, month: prev.month + 1 },
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

	function handleClear() {
		setCheckIn(null);
		setCheckOut(null);
		setHoverDate(null);
		onDatesChange?.({ checkIn: null, checkOut: null });
	}

	const sharedProps = {
		checkIn,
		checkOut,
		hoverDate,
		onSelect: handleSelect,
		onHover: setHoverDate,
	};

	return (
		<div className='border border-neutral-200 rounded-2xl p-6 bg-white'>
			<div className='flex items-center justify-between mb-6'>
				<button
					onClick={handlePrev}
					className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors'>
					<ChevronLeft className='w-4 h-4 text-neutral-600' />
				</button>
				<div className='flex flex-1 gap-8'>
					<MonthCalendar
						{...leftMonth}
						{...sharedProps}
					/>
					<div className='w-px bg-neutral-100' />
					<MonthCalendar
						{...rightMonth}
						{...sharedProps}
					/>
				</div>
				<button
					onClick={handleNext}
					className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors'>
					<ChevronRight className='w-4 h-4 text-neutral-600' />
				</button>
			</div>

			{(checkIn || checkOut) && (
				<div className='flex justify-end'>
					<button
						onClick={handleClear}
						className='text-sm text-neutral-800 underline hover:text-neutral-600 transition-colors'>
						Clear dates
					</button>
				</div>
			)}
		</div>
	);
}
