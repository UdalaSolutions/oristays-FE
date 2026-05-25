'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, LayoutList, MessageCircle, User, LogOut } from 'lucide-react';

const NAV = [
	{
		label: 'Reservations',
		href: '/host/dashboard',
		isActive: (p) =>
			p === '/host/dashboard' || p.startsWith('/host/dashboard/reservations'),
		icon: Home,
	},
	{
		label: 'My listings',
		href: '/host/dashboard/listings',
		isActive: (p) => p.startsWith('/host/dashboard/listings'),
		icon: LayoutList,
	},
	{
		label: 'Messages',
		href: '/host/dashboard/messages',
		isActive: (p) => p.startsWith('/host/dashboard/messages'),
		icon: MessageCircle,
	},
	{
		label: 'Profile',
		href: '/host/dashboard/profile',
		isActive: (p) => p.startsWith('/host/dashboard/profile'),
		icon: User,
	},
];

export default function HostSidebar() {
	const pathname = usePathname();
	const router = useRouter();

	function handleLogout() {
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('hostUser');
		router.push('/login');
	}

	return (
		<aside className='w-60 flex-shrink-0 border-r border-neutral-100 flex flex-col py-6 px-3'>
			<p className='text-primary font-bold text-lg px-3 mb-8'>Orí Stays</p>

			<nav className='flex-1 space-y-1'>
				{NAV.map(({ label, href, isActive, icon: Icon }) => (
					<Link
						key={label}
						href={href}
						className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
							isActive(pathname)
								? 'bg-brand-dark text-white'
								: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
						}`}>
						<Icon size={16} strokeWidth={1.5} />
						{label}
					</Link>
				))}
			</nav>

			<button
				onClick={handleLogout}
				className='flex items-center gap-2.5 text-sm text-neutral-500 hover:text-neutral-800 px-3 py-2 rounded-xl transition-colors'>
				<LogOut size={16} strokeWidth={1.5} />
				Log out
			</button>
		</aside>
	);
}
