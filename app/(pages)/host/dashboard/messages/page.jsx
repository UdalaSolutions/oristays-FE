import { MessageCircle } from 'lucide-react';

export default function MessagesPage() {
	return (
		<div className='flex flex-col flex-1'>
			<div className='px-8 pt-8 pb-6 border-b border-neutral-100'>
				<h1 className='text-xl font-bold text-neutral-900'>Messages</h1>
				<p className='text-sm text-neutral-500 mt-0.5'>Chat with your guests.</p>
			</div>

			<div className='flex flex-col items-center justify-center flex-1 text-center px-8'>
				<MessageCircle size={64} strokeWidth={1} className='text-neutral-300 mb-4' />
				<p className='text-sm font-medium text-neutral-700'>No messages yet</p>
			</div>
		</div>
	);
}
