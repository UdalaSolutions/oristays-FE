'use client';

import { useState } from 'react';
import { Search, MessageSquare } from 'lucide-react';

export default function MessagesPage() {
	const [query, setQuery] = useState('');

	return (
		<>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100'>
				<h1 className='text-xl font-bold text-neutral-900'>Messages</h1>
			</div>

			<div className='flex flex-1 overflow-hidden'>
				<div className='w-80 shrink-0 border-r border-neutral-100 flex flex-col'>
					<div className='px-4 py-4'>
						<div className='flex items-center gap-2 border border-neutral-200 rounded-full px-4 py-2.5'>
							<Search size={15} strokeWidth={1.5} className='text-neutral-400 shrink-0' />
							<input
								type='text'
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder='Search'
								className='flex-1 text-sm text-neutral-900 placeholder:text-neutral-400 bg-transparent outline-none'
							/>
						</div>
					</div>

					<div className='flex-1 flex flex-col items-center justify-center text-center px-6 pb-8'>
						<MessageSquare
							size={44}
							strokeWidth={1}
							className='text-neutral-300 mb-4'
						/>
						<p className='text-base font-bold text-neutral-900 mb-1'>
							You don&apos;t have any messages
						</p>
						<p className='text-sm text-neutral-400'>
							When you receive a new message, it will appear here.
						</p>
					</div>
				</div>

				<div className='flex-1' />
			</div>
		</>
	);
}
