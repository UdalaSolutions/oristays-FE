'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, CalendarDays, Users, MapPin } from 'lucide-react';
import DateRangePicker from '@/app/components/ui/Daterangepicker';

const SUGGESTED_DESTINATIONS = [
	{ name: 'Lekki', desc: 'Explore beach houses' },
	{ name: 'Victoria Island', desc: 'Business & luxury stays' },
	{ name: 'Ikoyi', desc: 'Premium apartments' },
	{ name: 'Ikeja', desc: 'Near the airport' },
];

const GUEST_FIELDS = [
	{ key: 'adults', label: 'Adults', desc: 'Ages 12 or older' },
	{ key: 'children', label: 'Children', desc: 'Ages 2 to 12' },
	{ key: 'infants', label: 'Infants', desc: 'Under 2' },
	{ key: 'pets', label: 'Pets', desc: 'Service animal?' },
];

function useClickOutside(ref, handler) {
	useEffect(() => {
		function listener(e) {
			if (!ref.current || ref.current.contains(e.target)) return;
			handler();
		}
		document.addEventListener('mousedown', listener);
		return () => document.removeEventListener('mousedown', listener);
	}, [ref, handler]);
}

function fmt(d) {
	return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function NavSearch() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [destination, setDestination] = useState(searchParams.get('destination') || '');
	const [showDestinations, setShowDestinations] = useState(false);
	const [showDates, setShowDates] = useState(false);
	const [showGuests, setShowGuests] = useState(false);
	const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
	const [checkIn, setCheckIn] = useState(null);
	const [checkOut, setCheckOut] = useState(null);

	const destRef = useRef(null);
	const dateRef = useRef(null);
	const guestRef = useRef(null);

	useClickOutside(destRef, () => setShowDestinations(false));
	useClickOutside(dateRef, () => setShowDates(false));
	useClickOutside(guestRef, () => setShowGuests(false));

	const totalGuests = guests.adults + guests.children;

	function updateGuest(key, delta) {
		setGuests((prev) => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
	}

	function handleSearch() {
		const params = new URLSearchParams();
		if (destination) params.set('destination', destination);
		if (checkIn) params.set('checkIn', checkIn.toISOString().split('T')[0]);
		if (checkOut) params.set('checkOut', checkOut.toISOString().split('T')[0]);
		if (totalGuests > 0) params.set('guests', totalGuests);
		router.push(`/apartments?${params.toString()}`);
	}

	const datesLabel = checkIn
		? checkOut
			? `${fmt(checkIn)} – ${fmt(checkOut)}`
			: fmt(checkIn)
		: 'Add dates';

	return (
		<div className='flex items-center gap-3 h-11 w-[664px] rounded-2xl border border-primary bg-[#FAF6F0] p-1.5'>
			{/* Destination */}
			<div ref={destRef} className='relative flex-1'>
				<button
					onClick={() => {
						setShowDestinations((v) => !v);
						setShowDates(false);
						setShowGuests(false);
					}}
					className='flex items-center gap-2 w-full h-8 px-3 text-left'>
					<Search size={16} className='text-neutral-400 shrink-0' />
					<span className={`text-sm truncate ${destination ? 'text-neutral-900' : 'text-[#6B7280]'}`}>
						{destination || 'Destinations'}
					</span>
				</button>

				{showDestinations && (
					<div className='absolute left-0 top-full mt-3 w-72 bg-white rounded-xl shadow-dropdown border border-neutral-100 z-50 overflow-hidden'>
						<input
							autoFocus
							type='text'
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							placeholder='Where to?'
							className='w-full px-4 py-3 text-sm border-b border-neutral-100 focus:outline-none'
						/>
						<div className='p-3'>
							<p className='text-xs font-medium text-neutral-500 mb-2'>
								Suggested destinations
							</p>
							{SUGGESTED_DESTINATIONS.map((d) => (
								<button
									key={d.name}
									onClick={() => {
										setDestination(d.name);
										setShowDestinations(false);
									}}
									className='w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-neutral-50 text-left'>
									<MapPin size={16} className='text-neutral-400 shrink-0' />
									<div>
										<p className='text-sm font-medium text-neutral-900'>{d.name}</p>
										<p className='text-xs text-neutral-500'>{d.desc}</p>
									</div>
								</button>
							))}
						</div>
					</div>
				)}
			</div>

			<div className='w-px h-5 bg-neutral-200' />

			{/* Dates */}
			<div ref={dateRef} className='relative flex-1'>
				<button
					onClick={() => {
						setShowDates((v) => !v);
						setShowDestinations(false);
						setShowGuests(false);
					}}
					className='flex items-center gap-2 w-full h-8 px-3 text-left'>
					<CalendarDays size={16} className='text-neutral-400 shrink-0' />
					<span className={`text-sm truncate ${checkIn ? 'text-neutral-900' : 'text-[#6B7280]'}`}>
						{datesLabel}
					</span>
				</button>

				{showDates && (
					<div className='absolute left-0 top-full mt-3 z-50'>
						<DateRangePicker
							onDatesChange={({ checkIn: ci, checkOut: co }) => {
								setCheckIn(ci);
								setCheckOut(co);
							}}
							onClose={() => setShowDates(false)}
						/>
					</div>
				)}
			</div>

			<div className='w-px h-5 bg-neutral-200' />

			{/* Guests */}
			<div ref={guestRef} className='relative flex-1'>
				<button
					onClick={() => {
						setShowGuests((v) => !v);
						setShowDestinations(false);
						setShowDates(false);
					}}
					className='flex items-center gap-2 w-full h-8 px-3 text-left'>
					<Users size={16} className='text-neutral-400 shrink-0' />
					<span className={`text-sm truncate ${totalGuests > 0 ? 'text-neutral-900' : 'text-[#6B7280]'}`}>
						{totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : 'Add guests'}
					</span>
				</button>

				{showGuests && (
					<div className='absolute right-0 top-full mt-3 bg-white rounded-xl shadow-dropdown border border-neutral-100 z-50 p-4 w-72'>
						{GUEST_FIELDS.map(({ key, label, desc }) => (
							<div
								key={key}
								className='flex items-center justify-between py-3 border-b border-neutral-100 last:border-0'>
								<div>
									<p className='text-sm font-medium text-neutral-900'>{label}</p>
									<p className='text-xs text-neutral-500'>{desc}</p>
								</div>
								<div className='flex items-center gap-3'>
									<button
										onClick={() => updateGuest(key, -1)}
										className='w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-900 transition-colors text-sm'>
										−
									</button>
									<span className='text-sm w-4 text-center'>{guests[key]}</span>
									<button
										onClick={() => updateGuest(key, 1)}
										className='w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-900 transition-colors text-sm'>
										+
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Search button */}
			<button
				onClick={handleSearch}
				aria-label='Search'
				className='w-10 h-8 rounded-xl bg-primary hover:bg-primary-hover flex items-center justify-center shrink-0 transition-colors'>
				<Search size={20} className='text-white' />
			</button>
		</div>
	);
}
