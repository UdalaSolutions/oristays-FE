'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
	ArrowLeft,
	ChevronRight,
	Clock,
	Users,
	Wifi,
	Wind,
	Car,
	Dumbbell,
	Waves,
	Camera,
	HeartPulse,
	Flame,
	UtensilsCrossed,
	Coffee,
	Monitor,
	Thermometer,
	Info,
} from 'lucide-react';
import { getListing, AMENITIES } from '@/app/lib/data/listings';

const ICON_MAP = {
	Wifi,
	Wind,
	UtensilsCrossed,
	Coffee,
	Car,
	Monitor,
	Thermometer,
	Dumbbell,
	Waves,
	Camera,
	HeartPulse,
	Flame,
};

export default function ListingDetailPage() {
	const { id } = useParams();
	const router = useRouter();
	const listing = getListing(id);

	const [tab, setTab] = useState('space');
	const [status, setStatus] = useState(listing?.status ?? 'active');
	const [activePanel, setActivePanel] = useState(null);

	const [editName, setEditName] = useState(listing?.title ?? '');
	const [editDescription, setEditDescription] = useState(listing?.description ?? '');

	if (!listing) {
		return (
			<div className='flex flex-col flex-1 items-center justify-center text-neutral-400'>
				Listing not found.
			</div>
		);
	}

	const visiblePhotos = listing.photos.slice(0, 3);
	const extraPhotos = listing.photos.length - 3;
	const listingAmenities = AMENITIES.filter((a) => listing.amenities.includes(a.id));
	const bookingLabel =
		listing.bookingType === 'instant' ? 'Guests can book automatically' : 'Guests request to book';

	function togglePanel(panel) {
		setActivePanel((prev) => (prev === panel ? null : panel));
	}

	function renderRightPanel() {
		switch (activePanel) {
			case 'promotions':
				return (
					<div>
						<p className='text-xl font-bold text-neutral-900 mb-6'>Promotions</p>
						<div>
							<label className='block text-sm text-neutral-500 mb-2'>Bank name</label>
							<input
								type='text'
								value={editName}
								onChange={(e) => setEditName(e.target.value)}
								className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
							/>
						</div>
					</div>
				);

			case 'name':
				return (
					<div>
						<p className='text-xl font-bold text-neutral-900 mb-6'>Name</p>
						<input
							type='text'
							value={editName}
							onChange={(e) => setEditName(e.target.value)}
							className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
					</div>
				);

			case 'description':
				return (
					<div>
						<p className='text-xl font-bold text-neutral-900 mb-6'>Description</p>
						<textarea
							value={editDescription}
							onChange={(e) => setEditDescription(e.target.value.slice(0, 500))}
							rows={5}
							className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none'
						/>
						<div className='flex items-center justify-end gap-1 mt-1.5 text-green-500'>
							<Info size={13} strokeWidth={1.5} />
							<p className='text-xs'>{editDescription.length}/500 characters</p>
						</div>
					</div>
				);

			default:
				return (
					<div>
						<p className='text-base font-bold text-neutral-900 mb-4'>Listing status</p>
						<div className='space-y-3'>
							<StatusOption
								value='active'
								current={status}
								label='Active'
								description='Your listing is visible in search results and can be booked.'
								onChange={setStatus}
							/>
							<StatusOption
								value='inactive'
								current={status}
								label='Inactive'
								description="Your listing is not visible in search results and can't be booked."
								onChange={setStatus}
							/>
						</div>
					</div>
				);
		}
	}

	return (
		<>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100'>
				<h1 className='text-xl font-bold text-neutral-900'>My listings</h1>
			</div>

			<div className='flex flex-1 overflow-hidden'>
				<div
					className={`flex-1 overflow-auto px-8 py-6 ${tab === 'space' ? 'border-r border-neutral-100' : ''}`}>
					<button
						onClick={() => router.back()}
						className='flex items-center gap-2 text-sm text-neutral-600 mb-6 hover:text-neutral-900 transition-colors'>
						<ArrowLeft size={16} strokeWidth={1.5} />
						Back
					</button>

					<div className='flex items-center gap-3 mb-6'>
						<button
							onClick={() => setTab('space')}
							className={`px-5 py-2 text-sm font-semibold rounded-full border transition-colors ${
								tab === 'space'
									? 'border-primary text-primary'
									: 'border-transparent text-neutral-500 hover:text-neutral-700'
							}`}>
							Your space
						</button>
						<button
							onClick={() => setTab('arrival')}
							className={`px-5 py-2 text-sm font-semibold rounded-full border transition-colors ${
								tab === 'arrival'
									? 'border-primary text-primary'
									: 'border-transparent text-neutral-500 hover:text-neutral-700'
							}`}>
							Arrival guide
						</button>
					</div>

					{tab === 'space' && (
						<div className='max-w-xl'>
							<SectionRow onClick={() => togglePanel('status')}>
								<div className='flex items-center gap-2'>
									<span
										className={`w-2.5 h-2.5 rounded-full shrink-0 ${status === 'active' ? 'bg-green-500' : 'bg-neutral-400'}`}
									/>
									<div>
										<p className='text-sm font-bold text-neutral-900'>
											{status === 'active' ? 'Active' : 'Inactive'}
										</p>
										<p className='text-sm text-neutral-400 mt-0.5'>
											{status === 'active'
												? 'Your listing is visible in search results and can be booked.'
												: "Your listing is not visible in search results and can't be booked."}
										</p>
									</div>
								</div>
							</SectionRow>

							<SectionRow onClick={() => togglePanel('promotions')}>
								<div>
									<p className='text-sm font-bold text-neutral-900'>Promotions</p>
									<p className='text-sm text-neutral-400 mt-0.5'>
										Get more visibility by promoting your listing.
									</p>
								</div>
							</SectionRow>

							<SectionRow onClick={() => togglePanel('name')}>
								<div>
									<p className='text-sm font-bold text-neutral-900'>Name</p>
									<p className='text-sm text-neutral-400 mt-0.5'>{editName || listing.title}</p>
								</div>
							</SectionRow>

							<SectionRow onClick={() => togglePanel('description')}>
								<div>
									<p className='text-sm font-bold text-neutral-900'>Description</p>
									<p className='text-sm text-neutral-400 mt-0.5'>
										{editDescription || listing.description}
									</p>
								</div>
							</SectionRow>

							<SectionRow>
								<div>
									<p className='text-sm font-bold text-neutral-900'>Property type</p>
									<p className='text-sm text-neutral-400 mt-0.5'>{listing.propertyType}</p>
								</div>
							</SectionRow>

							<SectionRow>
								<div>
									<p className='text-sm font-bold text-neutral-900 mb-3'>Photos</p>
									<div className='flex gap-2'>
										{visiblePhotos.map((photo, i) => (
											<div
												key={i}
												className='relative w-[120px] h-[80px] rounded-xl overflow-hidden bg-neutral-100 shrink-0'>
												<img
													src={photo}
													alt=''
													className='w-full h-full object-cover'
												/>
												{i === 2 && extraPhotos > 0 && (
													<div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
														<span className='text-white text-sm font-semibold'>
															+{extraPhotos} more
														</span>
													</div>
												)}
											</div>
										))}
									</div>
								</div>
							</SectionRow>

							<SectionRow>
								<div>
									<p className='text-sm font-bold text-neutral-900'>Price</p>
									<p className='text-sm text-neutral-400 mt-0.5'>${listing.price}</p>
								</div>
							</SectionRow>

							<SectionRow seeAll onSeeAll={() => {}}>
								<div>
									<p className='text-sm font-bold text-neutral-900 mb-3'>Amenities</p>
									<div className='space-y-2'>
										{listingAmenities.slice(0, 4).map((amenity) => {
											const Icon = ICON_MAP[amenity.icon];
											return (
												<div
													key={amenity.id}
													className='flex items-center gap-2'>
													{Icon && (
														<Icon
															size={16}
															strokeWidth={1.5}
															className='text-neutral-700 shrink-0'
														/>
													)}
													<p className='text-sm text-neutral-700'>{amenity.label}</p>
												</div>
											);
										})}
									</div>
								</div>
							</SectionRow>

							<SectionRow>
								<div>
									<p className='text-sm font-bold text-neutral-900'>Booking settings</p>
									<p className='text-sm text-neutral-400 mt-0.5'>{bookingLabel}</p>
								</div>
							</SectionRow>

							<SectionRow seeAll onSeeAll={() => {}}>
								<div>
									<p className='text-sm font-bold text-neutral-900 mb-3'>House rules</p>
									<div className='space-y-2'>
										<HouseRuleRow
											icon={Clock}
											text={`Check-in after ${listing.houseRules.checkIn}`}
										/>
										<HouseRuleRow
											icon={Clock}
											text={`Checkout before ${listing.houseRules.checkOut}`}
										/>
										<HouseRuleRow
											icon={Users}
											text={`${listing.houseRules.maxGuests} guests maximum`}
										/>
										<HouseRuleRow
											icon={Wifi}
											text={`Check in after ${listing.houseRules.checkIn}`}
										/>
									</div>
								</div>
							</SectionRow>

							<SectionRow last>
								<div>
									<p className='text-sm font-bold text-neutral-900 mb-3'>Location</p>
									<div className='rounded-xl overflow-hidden mb-3'>
										<iframe
											title='map'
											width='100%'
											height='160'
											loading='lazy'
											src='https://www.openstreetmap.org/export/embed.html?bbox=3.3192%2C6.4244%2C3.4392%2C6.6244&layer=mapnik&marker=6.5244%2C3.3792'
											className='block'
										/>
									</div>
									<p className='text-sm text-neutral-500'>{listing.address}</p>
								</div>
							</SectionRow>
						</div>
					)}

					{tab === 'arrival' && (
						<div className='max-w-xl'>
							{[
								'Directions',
								'Check-in method',
								'Checkout instructions',
								'Wifi details',
								'House manual',
								'Interaction preferences',
							].map((title, i, arr) => (
								<SectionRow
									key={title}
									last={i === arr.length - 1}
									onClick={() => {}}>
									<div>
										<p className='text-sm font-bold text-neutral-900'>{title}</p>
										<p className='text-sm text-neutral-400 mt-0.5'>Add details</p>
									</div>
								</SectionRow>
							))}
						</div>
					)}
				</div>

				{tab === 'space' && (
					<div className='w-72 shrink-0 px-6 py-8'>{renderRightPanel()}</div>
				)}
			</div>
		</>
	);
}

function SectionRow({ children, seeAll, onSeeAll, last, onClick }) {
	const inner = (
		<>
			<div className='flex-1 min-w-0'>{children}</div>
			{seeAll ? (
				<button
					onClick={(e) => {
						e.stopPropagation();
						onSeeAll?.();
					}}
					className='flex items-center gap-1 text-sm text-neutral-500 shrink-0 ml-3 mt-0.5 hover:text-neutral-700 transition-colors'>
					See all
					<ChevronRight size={14} strokeWidth={1.5} />
				</button>
			) : (
				<ChevronRight
					size={18}
					strokeWidth={1.5}
					className='text-neutral-400 shrink-0 mt-0.5 ml-3'
				/>
			)}
		</>
	);

	const baseClass = `flex items-start justify-between py-4 ${!last ? 'border-b border-neutral-100' : ''}`;

	if (onClick) {
		return (
			<button
				type='button'
				onClick={onClick}
				className={`w-full text-left ${baseClass} hover:bg-neutral-50/60 transition-colors`}>
				{inner}
			</button>
		);
	}

	return <div className={baseClass}>{inner}</div>;
}

function HouseRuleRow({ icon: Icon, text }) {
	return (
		<div className='flex items-center gap-2'>
			<Icon size={16} strokeWidth={1.5} className='text-neutral-600 shrink-0' />
			<p className='text-sm text-neutral-700'>{text}</p>
		</div>
	);
}

function StatusOption({ value, current, label, description, onChange }) {
	const selected = current === value;
	return (
		<button
			type='button'
			onClick={() => onChange(value)}
			className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-colors ${
				selected ? 'border-neutral-300' : 'border-neutral-200'
			}`}>
			<div
				className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
					selected ? 'border-neutral-900' : 'border-neutral-300'
				}`}>
				{selected && <div className='w-2.5 h-2.5 rounded-full bg-neutral-900' />}
			</div>
			<div>
				<p className='text-sm font-bold text-neutral-900'>{label}</p>
				<p className='text-xs text-neutral-400 mt-0.5'>{description}</p>
			</div>
		</button>
	);
}
