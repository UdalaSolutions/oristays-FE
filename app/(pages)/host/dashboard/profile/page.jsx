export default function ProfilePage() {
	return (
		<div className='flex flex-col flex-1'>
			<div className='px-8 pt-8 pb-6 border-b border-neutral-100'>
				<h1 className='text-xl font-bold text-neutral-900'>Profile</h1>
				<p className='text-sm text-neutral-500 mt-0.5'>
					Manage your host profile.
				</p>
			</div>

			<div className='px-8 py-6 max-w-lg'>
				<div className='space-y-4'>
					<div className='bg-neutral-50 rounded-2xl p-5'>
						<p className='text-xs text-neutral-500 mb-1'>Name</p>
						<p className='text-sm font-medium text-neutral-900'>Host User</p>
					</div>
					<div className='bg-neutral-50 rounded-2xl p-5'>
						<p className='text-xs text-neutral-500 mb-1'>Email</p>
						<p className='text-sm font-medium text-neutral-900'>
							host@example.com
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
