import HostSidebar from '@/app/components/host/HostSidebar';

export default function DashboardLayout({ children }) {
	return (
		<div className='flex h-screen bg-white overflow-hidden'>
			<HostSidebar />
			<div className='flex-1 overflow-auto flex flex-col'>{children}</div>
		</div>
	);
}
