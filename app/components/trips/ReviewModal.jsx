'use client';

import { useState } from 'react';
import { X, Star } from 'lucide-react';

const RATING_LABELS = {
	1: 'Not a great experience',
	2: 'Below average',
	3: 'It was okay',
	4: 'Good experience',
	5: 'Excellent experience',
};

export default function ReviewModal({ trip, onClose }) {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const [feedback, setFeedback] = useState('');

	const active = hover || rating;
	const placeName = trip?.title ?? 'Royal villa';

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
			<div
				className='absolute inset-0 bg-black/40 backdrop-blur-sm'
				onClick={onClose}
			/>

			<div className='relative bg-white rounded-2xl shadow-modal w-full max-w-md z-10 px-8 py-8'>
				<button
					onClick={onClose}
					aria-label='Close'
					className='absolute top-6 right-6 text-neutral-400 hover:text-neutral-700 transition-colors'>
					<X size={20} strokeWidth={1.5} />
				</button>

				{/* Overlapping thumbnails */}
				<div className='relative w-28 h-16 mx-auto mb-4'>
					<div className='absolute left-4 top-1 w-14 h-14 rounded-2xl overflow-hidden border-2 border-white -rotate-6 bg-brand-dark text-white flex items-center justify-center text-lg font-semibold'>
						{trip?.host?.initials ?? 'H'}
					</div>
					<img
						src={trip?.image ?? '/images/apartment-placeholder.jpg'}
						alt={placeName}
						className='absolute right-2 top-0 w-16 h-14 rounded-2xl object-cover border-2 border-white rotate-3'
					/>
				</div>

				<h2 className='font-georgia text-xl font-bold text-neutral-900 text-center mb-1'>
					How was your stay at {placeName}?
				</h2>
				<p className='text-sm text-neutral-500 text-center mb-6'>
					Rate your experience with this host
				</p>

				{/* Stars */}
				<div className='flex justify-center gap-3 mb-2'>
					{[1, 2, 3, 4, 5].map((n) => (
						<button
							key={n}
							onClick={() => setRating(n)}
							onMouseEnter={() => setHover(n)}
							onMouseLeave={() => setHover(0)}
							aria-label={`${n} star`}>
							<Star
								size={34}
								strokeWidth={1.5}
								className={
									n <= active ? 'text-primary fill-primary' : 'text-neutral-300'
								}
							/>
						</button>
					))}
				</div>
				<p className='text-center text-sm font-medium text-primary h-5 mb-6'>
					{active ? RATING_LABELS[active] : ''}
				</p>

				<label className='block text-sm text-neutral-600 mb-2'>
					Tell us about your experience
				</label>
				<textarea
					rows={4}
					value={feedback}
					onChange={(e) => setFeedback(e.target.value)}
					placeholder='Write your feedback...'
					className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none mb-6'
				/>

				<button
					onClick={onClose}
					disabled={rating === 0}
					className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-colors ${
						rating > 0
							? 'bg-primary hover:bg-primary-hover text-white'
							: 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
					}`}>
					Submit
				</button>
			</div>
		</div>
	);
}
