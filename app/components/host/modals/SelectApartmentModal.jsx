'use client';

import { useState } from 'react';
import { X, Search, Check } from 'lucide-react';
import { APARTMENTS } from '@/app/lib/data/listings';

export default function SelectApartmentModal({ onClose, onSelect }) {
	const [search, setSearch] = useState('');
	const [picked, setPicked] = useState(null);

	const filtered = APARTMENTS.filter((a) =>
		a.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center p-4'
			style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className='bg-white rounded-2xl w-full max-w-lg shadow-modal max-h-[85vh] flex flex-col'>
				<div className='flex items-center justify-between px-6 pt-6 pb-4 shrink-0'>
					<h3 className='text-base font-bold text-neutral-900'>Select apartment</h3>
					<button
						onClick={onClose}
						className='text-neutral-400 hover:text-neutral-700 transition-colors'>
						<X size={20} strokeWidth={1.5} />
					</button>
				</div>

				<div className='px-6 pb-4 shrink-0'>
					<div className='relative'>
						<Search
							size={16}
							strokeWidth={1.5}
							className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400'
						/>
						<input
							type='text'
							placeholder='Search'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className='w-full pl-9 pr-4 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary'
						/>
					</div>
				</div>

				<div className='overflow-y-auto flex-1 px-6 pb-4'>
					<div className='grid grid-cols-2 gap-4'>
						{filtered.map((apt) => {
							const isSelected = picked?.id === apt.id;
							return (
								<button
									key={apt.id}
									onClick={() => setPicked(apt)}
									className={`text-left border-2 rounded-2xl overflow-hidden transition-all ${
										isSelected
											? 'border-primary'
											: 'border-neutral-200 hover:border-neutral-300'
									}`}>
									<div className='relative h-36 bg-neutral-100'>
										<img
											src={apt.image}
											alt={apt.name}
											className='w-full h-full object-cover'
										/>
										<span className='absolute top-2 left-2 bg-white text-xs font-semibold text-neutral-700 px-2.5 py-1 rounded-full shadow-sm'>
											{apt.badge}
										</span>
										{isSelected && (
											<div className='absolute top-2 right-2 bg-primary rounded-full p-0.5'>
												<Check size={14} strokeWidth={2.5} className='text-white' />
											</div>
										)}
									</div>
									<div className='p-4'>
										<p className='text-sm font-bold text-neutral-900'>{apt.name}</p>
										<p className='text-xs text-neutral-500 mt-1'>
											{apt.guests} guests, {apt.beds} bed, {apt.baths} bath
										</p>
										<p className='mt-2'>
											<span className='text-base font-bold text-neutral-900'>
												${apt.price}
											</span>
											<span className='text-xs text-neutral-400 ml-0.5'>/night</span>
										</p>
									</div>
								</button>
							);
						})}
					</div>
				</div>

				<div className='px-6 py-5 shrink-0 flex justify-end border-t border-neutral-100'>
					<button
						onClick={() => picked && onSelect(picked)}
						disabled={!picked}
						className={`px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
							picked
								? 'bg-primary hover:bg-primary-hover text-white'
								: 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
						}`}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
