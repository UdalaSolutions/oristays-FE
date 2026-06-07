import AdminSidebar from '@/app/components/admin/AdminSidebar';

export default function AdminLayout({ children }) {
	return (
		<div className='flex h-screen bg-white overflow-hidden'>
			<AdminSidebar />
			<div className='flex-1 overflow-auto flex flex-col'>{children}</div>
		</div>
	);
}
