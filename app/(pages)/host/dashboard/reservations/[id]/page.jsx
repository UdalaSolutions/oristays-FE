'use client';

import { use, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { getReservationBySlug, getStatusStyle } from '@/app/lib/data/reservations';
import ChangeReservationModal from '@/app/components/host/modals/ChangeReservationModal';

export default function ReservationDetailPage({ params }) {
	const { id } = use(params);
	const reservation = getReservationBySlug(id);

	const [menuOpen, setMenuOpen] = useState(false);
	const [showChangeModal, setShowChangeModal] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		function handleOutsideClick(e) {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setMenuOpen(false);
			}
		}
		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, []);

	return (
		<>
			<div className='px-8 pt-8 pb-6 border-b border-neutral-100'>
				<h1 className='text-xl font-bold text-neutral-900'>Reservations details</h1>
			</div>

			<div className='px-8 py-8 flex-1 overflow-auto'>
				<Link
					href='/host/dashboard'
					className='inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-8'>
					<ArrowLeft size={16} strokeWidth={1.5} />
					Back
				</Link>

				<div className='flex gap-12'>
					<div className='flex-1 min-w-0'>
						<div className='flex items-center justify-between mb-5'>
							<span
								className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(reservation.status)}`}>
								{reservation.status}
							</span>

							<div ref={menuRef} className='relative'>
								<button
									onClick={() => setMenuOpen((v) => !v)}
									className='p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100 transition-colors'>
									<MoreVertical size={18} />
								</button>

								{menuOpen && (
									<div className='absolute right-0 top-full mt-1 w-52 bg-white border border-neutral-200 rounded-xl shadow-dropdown z-20 overflow-hidden'>
										<button
											onClick={() => {
												setMenuOpen(false);
												setShowChangeModal(true);
											}}
											className='w-full text-left px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors'>
											Change reservation
										</button>
										<button
											onClick={() => setMenuOpen(false)}
											className='w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-neutral-100'>
											Cancel reservation
										</button>
									</div>
								)}
							</div>
						</div>

						<h2 className='text-2xl font-bold text-neutral-900 mb-6'>
							{reservation.title}
						</h2>

						<div className='flex border border-neutral-200 rounded-xl overflow-hidden mb-8 bg-neutral-50/50'>
							<div className='flex-1 px-5 py-4'>
								<p className='text-xs text-neutral-400 mb-1.5'>Check-in</p>
								<p className='text-sm font-semibold text-neutral-900'>
									{reservation.checkIn}
								</p>
							</div>
							<div className='w-px bg-neutral-200' />
							<div className='flex-1 px-5 py-4'>
								<p className='text-xs text-neutral-400 mb-1.5'>Check-out</p>
								<p className='text-sm font-semibold text-neutral-900'>
									{reservation.checkOut}
								</p>
							</div>
						</div>

						<p className='text-sm font-semibold text-neutral-900 mb-6'>
							Reservation details
						</p>

						<div className='space-y-6'>
							<DetailField label='Booker' value={reservation.booker} />
							<DetailField label='Booking reference' value={reservation.id} />
							<DetailField label='Guests' value={reservation.guestLabel} />
							<DetailField
								label='Amount'
								value={`$${reservation.total}`}
								bold
							/>
						</div>
					</div>

					<div className='w-[420px] flex-shrink-0'>
						<div className='rounded-2xl overflow-hidden bg-neutral-100 h-full min-h-[440px]'>
							<img
								src={reservation.image}
								alt={reservation.title}
								className='w-full h-full object-cover'
							/>
						</div>
					</div>
				</div>
			</div>

			{showChangeModal && (
				<ChangeReservationModal
					reservation={reservation}
					onClose={() => setShowChangeModal(false)}
				/>
			)}
		</>
	);
}

function DetailField({ label, value, bold = false }) {
	return (
		<div>
			<p className='text-sm text-neutral-400 mb-1'>{label}</p>
			<p className={`text-sm ${bold ? 'font-bold text-neutral-900' : 'text-neutral-800'}`}>
				{value}
			</p>
		</div>
	);
}
