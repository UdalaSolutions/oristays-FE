'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
	ArrowLeft,
	MoreVertical,
	MapPin,
	CreditCard,
	Phone,
	MessageSquare,
	Headphones,
	ChevronRight,
} from 'lucide-react';
import Navbar from '@/app/components/layout/Navbar';
import LoginModal from '@/app/components/modals/Loginmodal';
import MessageHostDrawer from '@/app/components/trips/MessageHostDrawer';
import ChangeReservationDrawer from '@/app/components/trips/ChangeReservationDrawer';
import ReviewModal from '@/app/components/trips/ReviewModal';
import { useAuth } from '@/app/lib/useAuth';
import { getTrip, getTripStatusStyle } from '@/app/lib/data/trips';

function FieldRow({ label, value }) {
	return (
		<div>
			<p className='text-sm text-neutral-400'>{label}</p>
			<p className='text-sm text-neutral-900 mt-1'>{value}</p>
		</div>
	);
}

function ActionRow({ icon: Icon, label, onClick, last }) {
	return (
		<button
			onClick={onClick}
			className={`w-full flex items-center justify-between py-4 text-left ${
				last ? '' : 'border-b border-neutral-100'
			}`}>
			<span className='flex items-center gap-3'>
				<Icon size={18} strokeWidth={1.5} className='text-neutral-500 shrink-0' />
				<span className='text-sm font-medium text-neutral-900'>{label}</span>
			</span>
			<ChevronRight size={18} strokeWidth={1.5} className='text-neutral-400 shrink-0' />
		</button>
	);
}

export default function TripDetailPage() {
	const { id } = useParams();
	const trip = getTrip(id);

	const { isLoggedIn, user, login, logout } = useAuth();
	const [loginOpen, setLoginOpen] = useState(false);

	const [menuOpen, setMenuOpen] = useState(false);
	const [messageOpen, setMessageOpen] = useState(false);
	const [changeOpen, setChangeOpen] = useState(false);
	const [reviewOpen, setReviewOpen] = useState(false);
	const [showAllRules, setShowAllRules] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		function onClick(e) {
			if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
		}
		document.addEventListener('mousedown', onClick);
		return () => document.removeEventListener('mousedown', onClick);
	}, []);

	const rules = showAllRules ? trip.houseRules : trip.houseRules.slice(0, 4);

	return (
		<>
			<Navbar
				variant='minimal'
				isLoggedIn={isLoggedIn}
				user={user}
				onSignupClick={() => setLoginOpen(true)}
				onLoginClick={() => setLoginOpen(true)}
				onLogout={logout}
			/>

			<main className='max-w-335 mx-auto px-6 py-8'>
				<div className='flex items-center gap-3 mb-8'>
					<Link
						href='/trips'
						className='text-neutral-900 hover:text-neutral-600 transition-colors'>
						<ArrowLeft size={20} strokeWidth={1.75} />
					</Link>
					<h1 className='text-xl font-bold text-neutral-900'>Trips details</h1>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14'>
					{/* Left column */}
					<div>
						<span
							className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${getTripStatusStyle(trip.status)}`}>
							{trip.status}
						</span>

						<div className='flex items-start justify-between mb-6'>
							<h2 className='font-georgia text-2xl font-bold text-neutral-900'>
								{trip.title}
							</h2>

							<div className='relative' ref={menuRef}>
								<button
									onClick={() => setMenuOpen((v) => !v)}
									className='p-1.5 -mr-1.5 text-neutral-400 hover:text-neutral-700 transition-colors'>
									<MoreVertical size={20} strokeWidth={1.5} />
								</button>

								{menuOpen && (
									<div className='absolute right-0 top-full mt-1 w-56 bg-white border border-neutral-100 rounded-2xl shadow-dropdown z-20 overflow-hidden py-1'>
										<button
											onClick={() => setMenuOpen(false)}
											className='w-full text-left px-5 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors'>
											Share reservation
										</button>
										<button
											onClick={() => {
												setMenuOpen(false);
												setChangeOpen(true);
											}}
											className='w-full text-left px-5 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors'>
											Change reservation
										</button>
										<button
											onClick={() => setMenuOpen(false)}
											className='w-full text-left px-5 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors'>
											Cancel reservation
										</button>
									</div>
								)}
							</div>
						</div>

						{/* Check-in / Check-out */}
						<div className='flex bg-[#FAF6F0] rounded-xl overflow-hidden mb-8'>
							<div className='flex-1 px-5 py-4'>
								<p className='text-sm text-neutral-500 mb-1'>Check-in</p>
								<p className='text-sm font-semibold text-neutral-900'>{trip.checkIn}</p>
							</div>
							<div className='w-px bg-neutral-200/80' />
							<div className='flex-1 px-5 py-4'>
								<p className='text-sm text-neutral-500 mb-1'>Check-out</p>
								<p className='text-sm font-semibold text-neutral-900'>{trip.checkOut}</p>
							</div>
						</div>

						{trip.category === 'past' && (
							<button
								onClick={() => setReviewOpen(true)}
								className='w-full mb-8 bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-xl text-sm transition-colors'>
								Leave a review
							</button>
						)}

						{/* Reservation details */}
						<p className='text-sm font-bold text-neutral-900 mb-5'>Reservation details</p>
						<div className='space-y-5'>
							<FieldRow label='Booker' value={trip.booker} />
							<FieldRow label='Booking reference' value={trip.reference} />
							<FieldRow label='Guests' value={trip.guestLabel} />
							<FieldRow label='Price' value={`$${trip.price}`} />
							<FieldRow label='Address' value={trip.address} />
						</div>

						<div className='mt-2'>
							<ActionRow icon={MapPin} label='Get directions' />
							<ActionRow icon={CreditCard} label='Manage payment' last />
						</div>

						<div className='border-t border-neutral-100 my-6' />

						{/* Cancellation policy */}
						<p className='text-sm font-bold text-neutral-900 mb-2'>Cancellation Policy</p>
						<p className='text-sm text-neutral-500 leading-relaxed mb-2'>
							{trip.cancellationPolicy}
						</p>
						<button className='text-sm font-semibold text-neutral-900 underline'>
							Read policy
						</button>

						<div className='border-t border-neutral-100 my-6' />

						{/* Host */}
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-11 h-11 rounded-full bg-brand-dark text-white flex items-center justify-center text-sm font-semibold shrink-0'>
								{trip.host.initials}
							</div>
							<div>
								<p className='text-sm font-bold text-neutral-900'>
									Hosted by {trip.host.name}
								</p>
								<p className='text-xs text-neutral-400 mt-0.5'>{trip.host.since}</p>
							</div>
						</div>
						<ActionRow icon={Phone} label='Call host' />
						<ActionRow icon={MessageSquare} label='Message host' onClick={() => setMessageOpen(true)} last />

						<div className='border-t border-neutral-100 my-6' />

						{/* House rules */}
						<p className='text-sm font-bold text-neutral-900 mb-4'>House rules</p>
						<div className='space-y-3'>
							{rules.map((rule) => (
								<p key={rule} className='text-sm text-neutral-700'>
									{rule}
								</p>
							))}
						</div>
						{trip.houseRules.length > 4 && (
							<button
								onClick={() => setShowAllRules((v) => !v)}
								className='mt-3 text-sm font-semibold text-neutral-900 underline'>
								{showAllRules ? 'Show less' : 'Show more'}
							</button>
						)}

						<div className='border-t border-neutral-100 my-6' />

						{/* Need help */}
						<p className='text-sm font-bold text-neutral-900 mb-1'>Need help?</p>
						<ActionRow icon={Headphones} label='Contact Ori Stays Support' last />
					</div>

					{/* Right column - image */}
					<div>
						<div className='lg:sticky lg:top-24 rounded-2xl overflow-hidden bg-neutral-100 aspect-[4/5]'>
							<img
								src={trip.image}
								alt={trip.title}
								className='w-full h-full object-cover'
							/>
						</div>
					</div>
				</div>
			</main>

			{messageOpen && (
				<MessageHostDrawer trip={trip} onClose={() => setMessageOpen(false)} />
			)}
			{changeOpen && (
				<ChangeReservationDrawer trip={trip} onClose={() => setChangeOpen(false)} />
			)}
			{reviewOpen && <ReviewModal trip={trip} onClose={() => setReviewOpen(false)} />}

			<LoginModal
				isOpen={loginOpen}
				onClose={() => setLoginOpen(false)}
				onSuccess={(email) => {
					login(email);
					setLoginOpen(false);
				}}
			/>
		</>
	);
}
