'use client';

import { useState } from 'react';
import { X, MoreVertical, ImageIcon, ChevronUp } from 'lucide-react';

export default function MessageHostDrawer({ trip, onClose }) {
	const [messages, setMessages] = useState([
		{
			from: 'guest',
			text: "Hello John, I'd like to make enquiries on the amenities offered at your place",
		},
		{ from: 'host', text: "Hello Adaeze, we're here to answer all your questions" },
	]);
	const [draft, setDraft] = useState('');

	function send() {
		if (!draft.trim()) return;
		setMessages((m) => [...m, { from: 'guest', text: draft.trim() }]);
		setDraft('');
	}

	return (
		<div className='fixed inset-0 z-50 flex'>
			<div
				className='flex-1 bg-black/30 backdrop-blur-sm'
				onClick={onClose}
			/>

			<div className='w-full max-w-[520px] bg-white h-full flex flex-col shadow-2xl'>
				{/* Header */}
				<div className='px-6 pt-6'>
					<button
						onClick={onClose}
						aria-label='Close'
						className='text-neutral-500 hover:text-neutral-900 transition-colors mb-5'>
						<X size={22} strokeWidth={1.5} />
					</button>

					<div className='flex items-center justify-between pb-5'>
						<div className='flex items-center gap-3'>
							<div className='w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center text-sm font-semibold shrink-0'>
								{trip.host.initials}
							</div>
							<p className='text-lg font-bold text-neutral-900'>{trip.host.name}</p>
						</div>
						<button className='text-neutral-400 hover:text-neutral-700 transition-colors'>
							<MoreVertical size={20} strokeWidth={1.5} />
						</button>
					</div>
				</div>

				{/* Messages */}
				<div className='flex-1 overflow-y-auto no-scrollbar px-6 py-4'>
					<p className='text-center text-sm font-semibold text-neutral-900 mb-4'>Mar 2</p>

					<p className='text-center text-sm text-neutral-500 mb-8'>
						Your reservation for {trip.guestLabel.includes('adult') ? '2 guests' : trip.guestsShort} on Mar 20–22 is
						confirmed.{' '}
						<button className='text-neutral-900 underline font-medium'>
							Show reservation
						</button>
					</p>

					<div className='space-y-4'>
						{messages.map((m, i) =>
							m.from === 'guest' ? (
								<div key={i} className='flex justify-end'>
									<div className='max-w-[78%] bg-primary text-white text-sm leading-relaxed rounded-2xl rounded-br-md px-4 py-3'>
										{m.text}
									</div>
								</div>
							) : (
								<div key={i} className='flex justify-start'>
									<div className='max-w-[78%] bg-neutral-100 text-neutral-800 text-sm leading-relaxed rounded-2xl rounded-bl-md px-4 py-3'>
										{m.text}
									</div>
								</div>
							)
						)}
					</div>
				</div>

				{/* Composer */}
				<div className='px-6 pb-6 pt-2'>
					<div className='border border-neutral-200 rounded-2xl px-4 py-3'>
						<textarea
							rows={2}
							value={draft}
							onChange={(e) => setDraft(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault();
									send();
								}
							}}
							placeholder='Write a message...'
							className='w-full resize-none text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none bg-transparent'
						/>
						<div className='flex items-center justify-between pt-1'>
							<button className='text-neutral-400 hover:text-neutral-600 transition-colors'>
								<ImageIcon size={20} strokeWidth={1.5} />
							</button>
							<button
								onClick={send}
								aria-label='Send'
								className='text-neutral-400 hover:text-neutral-700 transition-colors'>
								<ChevronUp size={20} strokeWidth={1.5} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
