'use client';

import { useEffect } from 'react';

export default function Modal({
	isOpen,
	onClose,
	title,
	children,
	maxWidth = 'max-w-lg',
}) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
			<div
				className='absolute inset-0 bg-black/40 backdrop-blur-sm'
				onClick={onClose}
			/>
			<div
				className={`relative bg-white rounded-2xl shadow-modal w-full ${maxWidth} z-10`}>
				<div className='flex items-center justify-between p-6 pb-4'>
					<h2 className='text-lg font-semibold text-neutral-900'>{title}</h2>
					<button
						onClick={onClose}
						className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors text-neutral-500'>
						<svg
							className='w-5 h-5'
							fill='none'
							stroke='currentColor'
							strokeWidth={2}
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>
				<div className='px-6 pb-6'>{children}</div>
			</div>
		</div>
	);
}
