'use client';

import { useState } from 'react';
import Modal from './Modal';

export default function SpecialRequestModal({ isOpen, onClose, onAddNote }) {
	const [message, setMessage] = useState('');

	function handleAdd() {
		onAddNote?.(message);
		onClose();
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title='Special request'>
			<div className='space-y-4'>
				<textarea
					placeholder='Leave a message for host'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					rows={4}
					className='w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none'
				/>

				<div className='flex items-start gap-2 text-xs text-neutral-500'>
					<svg
						className='w-4 h-4 flex-shrink-0 mt-0.5'
						fill='none'
						stroke='currentColor'
						strokeWidth={1.5}
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
						/>
					</svg>
					Please note that requests are not guaranteed and are subject to
					availability at the property.
				</div>

				<div className='flex justify-end'>
					<button
						onClick={handleAdd}
						className={`px-6 py-3 rounded-lg text-sm font-semibold transition-colors ${
							message.trim() ?
								'bg-primary hover:bg-primary-hover text-white'
							:	'bg-neutral-200 text-neutral-400 cursor-not-allowed'
						}`}>
						Add note
					</button>
				</div>
			</div>
		</Modal>
	);
}
